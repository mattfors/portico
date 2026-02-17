# Service: Data Service (Example)

## Context
- **Purpose**: Generic data service for CRUD operations on a resource
- **Scope**: Feature module level
- **Dependencies**: HttpClient, environment configuration

## Requirements

### Functional Requirements
- [ ] Fetch all items (with pagination)
- [ ] Fetch single item by ID
- [ ] Create new item
- [ ] Update existing item
- [ ] Delete item
- [ ] Search/filter items

### Technical Requirements
- [ ] Injectable with providedIn: 'root' or feature module
- [ ] TypeScript strict mode
- [ ] Observable-based API (no promises)
- [ ] Proper error handling with typed errors
- [ ] Request caching where appropriate
- [ ] Loading state management

## Service Specifications

### Public API
```typescript
export class DataService<T> {
  // Get all items with optional pagination
  getAll(params?: PaginationParams): Observable<PaginatedResponse<T>>;
  
  // Get single item by ID
  getById(id: string | number): Observable<T>;
  
  // Create new item
  create(item: Partial<T>): Observable<T>;
  
  // Update existing item
  update(id: string | number, item: Partial<T>): Observable<T>;
  
  // Delete item
  delete(id: string | number): Observable<void>;
  
  // Search items
  search(query: string, filters?: Record<string, any>): Observable<T[]>;
}
```

### Dependencies
```typescript
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '@environments/environment';
```

### Data Models
```typescript
export interface PaginationParams {
  page: number;
  pageSize: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

export interface ApiError {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
}
```

### State Management
- Cache responses for 5 minutes
- Invalidate cache on create/update/delete
- Share in-flight requests (no duplicate requests)

## Implementation Details

### HTTP Communication
- Base URL from environment.apiUrl
- RESTful endpoint pattern: `/api/resource`
- Content-Type: application/json
- Include auth token in headers (via interceptor)

### Endpoints
```typescript
GET    /api/resource          // Get all
GET    /api/resource/:id      // Get by ID
POST   /api/resource          // Create
PUT    /api/resource/:id      // Update
DELETE /api/resource/:id      // Delete
GET    /api/resource/search   // Search
```

### Caching Strategy
- Use BehaviorSubject for cached data
- 5-minute TTL
- Cache key: endpoint + params
- Clear cache on mutations

### Error Handling
```typescript
private handleError(error: HttpErrorResponse): Observable<never> {
  const apiError: ApiError = {
    message: error.error?.message || 'An error occurred',
    statusCode: error.status,
    errors: error.error?.errors
  };
  
  // Log error
  console.error('API Error:', apiError);
  
  // Transform and throw
  return throwError(() => apiError);
}
```

### Retry Logic
- Retry GET requests up to 3 times with exponential backoff
- Do not retry POST/PUT/DELETE (idempotency concerns)

## Testing Requirements

### Unit Tests
- [ ] getAll returns data correctly
- [ ] getAll handles pagination params
- [ ] getById returns single item
- [ ] getById handles 404 errors
- [ ] create sends correct payload
- [ ] create returns created item
- [ ] update sends correct payload
- [ ] update returns updated item
- [ ] delete calls correct endpoint
- [ ] delete handles errors
- [ ] search builds correct query params
- [ ] search returns filtered results
- [ ] error handling works correctly
- [ ] caching works as expected
- [ ] cache invalidation works

### Mock Data
```typescript
const mockItem: T = {
  id: 1,
  // ... other properties
};

const mockPaginatedResponse: PaginatedResponse<T> = {
  data: [mockItem],
  total: 1,
  page: 1,
  pageSize: 10
};
```

### Coverage Goal
- Minimum 85% coverage

## Acceptance Criteria
- [ ] All CRUD operations work correctly
- [ ] Pagination works as expected
- [ ] Search/filtering works correctly
- [ ] Errors are handled and transformed properly
- [ ] Caching improves performance
- [ ] No memory leaks
- [ ] All tests pass with >85% coverage
- [ ] Type safety enforced throughout
- [ ] Observable patterns followed correctly

## Usage Examples

### In a Component
```typescript
export class ItemListComponent implements OnInit {
  items$: Observable<PaginatedResponse<Item>>;
  
  constructor(private dataService: DataService<Item>) {}
  
  ngOnInit() {
    this.items$ = this.dataService.getAll({ page: 1, pageSize: 10 });
  }
  
  createItem(item: Partial<Item>) {
    this.dataService.create(item).subscribe({
      next: (created) => console.log('Created:', created),
      error: (err: ApiError) => console.error('Error:', err.message)
    });
  }
}
```

### With Error Handling
```typescript
this.dataService.getById(id).pipe(
  catchError((error: ApiError) => {
    this.notificationService.error(error.message);
    return of(null);
  })
).subscribe(item => {
  if (item) {
    this.item = item;
  }
});
```

## Related Services
- HttpClient (Angular)
- ErrorHandlingService
- NotificationService
- CacheService
