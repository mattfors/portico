# Visual Model

## Layout Pattern (VS Code-Inspired)

Portico follows VS Code's proven layout pattern: a persistent left sidebar for navigation and a flexible tabbed workspace for content.

### Initial State (Form Expanded)

```
┌─────────────────────────────────────────────────────────────┐
│  Portico Workspace                                    [−][□][×]│
├──────────────┬──────────────────────────────────────────────┤
│              │  Tab: [Inventory Search]                 [×] │
│   SIDEBAR    ├──────────────────────────────────────────────┤
│              │                                              │
│  🔍 Search   │  ┌─────────────────────────────────────┐   │
│              │  │ Search Parameters              [−]  │   │
│  📂 Menu     │  │ SKU:        [________]              │   │
│   Inventory  │  │ Location:   [Warehouse A ▾]         │   │
│   ├ Search   │  │ Status:     [All ▾]                 │   │
│   ├ Receive  │  │                      [Search] [Reset] │   │
│   └ Adjust   │  └─────────────────────────────────────┘   │
│   Orders     │                                              │
│   ├ Search   │  (No results yet - grid appears after       │
│   ├ Create   │   search is submitted)                      │
│   └ History  │                                              │
│   Shipping   │                                              │
│   Reports    │                                              │
│   Settings   │                                              │
│              │                                              │
│              │                                              │
│              │                                              │
│              │                                              │
└──────────────┴──────────────────────────────────────────────┘
```

### Results State (Form Collapsed)

```
┌─────────────────────────────────────────────────────────────┐
│  Portico Workspace                                    [−][□][×]│
├──────────────┬──────────────────────────────────────────────┤
│              │  Tab: [Inventory Search (127)]          [×] │
│   SIDEBAR    ├──────────────────────────────────────────────┤
│              │                                              │
│  🔍 Search   │  ▶ SKU: ABC*, Location: Warehouse A [Modify]│
│              │                                              │
│  📂 Menu     │  ┌─────────────────────────────────────┐   │
│   Inventory  │  │ Data Grid (AG Grid)                 │   │
│   ├ Search   │  │ ┌───┬─────────┬────────────┬─────┐ │   │
│   ├ Receive  │  │ │☑│ SKU     │ Description │ Qty │ │   │
│   └ Adjust   │  │ ├───┼─────────┼────────────┼─────┤ │   │
│   Orders     │  │ │☐│ ABC-123 │ Widget     │ 50  │ │   │
│   ├ Search   │  │ │☐│ ABC-124 │ Widget Blue│ 45  │ │   │
│   ├ Create   │  │ │☐│ ABC-125 │ Widget Red │ 30  │ │   │
│   └ History  │  │ │☐│ ABC-126 │ Widget Grn │ 25  │ │   │
│   Shipping   │  │ │☐│ ABC-127 │ Widget Blk │ 15  │ │   │
│   Reports    │  │ └───┴─────────┴────────────┴─────┘ │   │
│   Settings   │  │ Showing 1-5 of 127 items      [<][>] │   │
│              │  └─────────────────────────────────────┘   │
│              │                                              │
│              │  Actions: [Export] [Adjust Qty] [Transfer] │
│              │                                              │
└──────────────┴──────────────────────────────────────────────┘
```

## Left Sidebar

### Components

**Global Search** (top)
- Quick search across screens and menu items
- Keyboard shortcut: `Ctrl+K` / `Cmd+K`
- Filters menu tree in real-time

**Hierarchical Menu** (main area)
- Tree structure like VS Code's file explorer
- Expandable/collapsible sections
- Icons for visual recognition
- Context menu on right-click

### Behavior

- **Collapsible** - Toggle sidebar visibility for more screen space
- **Resizable** - Drag border to adjust width
- **Persisted** - Expanded/collapsed state saves between sessions
- **Keyboard navigation** - Arrow keys to navigate, Enter to open

### Menu Node Interactions

- **Single click** - Select node (highlight)
- **Double click** - Open screen in new tab
- **Right click** - Context menu (Open, Open in New Tab, Pin)
- **Drag** - Reorder favorites (future)

## Main Workspace (Dockview)

### Tab Bar

Located above the content area, contains:

- **Tab list** - Open screens as tabs
- **Active indicator** - Currently selected tab highlighted
- **Close buttons** - `×` on each tab
- **Add button** - `+` to open new tab from menu
- **Overflow** - Dropdown when too many tabs

### Tab Operations

**Opening Tabs**
- Double-click menu item → new tab (or focus if already open)
- `Ctrl+Click` menu item → new tab in background
- Action button → child screen in new tab
- Deep link → open specific screen with parameters

**Managing Tabs**
- **Reorder** - Drag tabs to reposition
- **Pin** - Right-click → Pin (stays left, no close button)
- **Close** - Click `×` or middle-click
- **Close Others** - Right-click → Close Others
- **Split** - Right-click → Split Right/Down

**Tab States**
- **Active** - Currently displayed (highlighted)
- **Dirty** - Unsaved form changes (dot indicator)
- **Pinned** - Always visible, no close button
- **Loading** - Spinner while data fetches

### Panel Splits

Like VS Code editors, tabs can be split:

```
┌────────────────────┬────────────────────┐
│  Tab: Order Search │ Tab: Order #1234   │
│                    │                    │
│  [Search form]     │  [Order details]   │
│  [Results grid]    │  [Line items]      │
│                    │                    │
└────────────────────┴────────────────────┘
```

- Split horizontally or vertically
- Resize panels by dragging divider
- Each panel has its own tab bar
- Drag tabs between panels

### Persistence

On reload, workspace restores:
- Open tabs (screenId + parameters)
- Active tab selection
- Panel split layout
- Sidebar expanded/collapsed state
- Form field values (where applicable)

## Screen Types in Tabs

### Canonical Screen

Each tab is self-contained with form, grid, and actions. The form has two states:

#### 1. Form Expanded (Initial State)

```
┌──────────────────────────────────────────┐
│  Tab: Inventory Search                   │
├──────────────────────────────────────────┤
│  ┌────────────────────────────────────┐ │
│  │ Search Parameters            [−]   │ │
│  │ SKU:        [________]             │ │
│  │ Location:   [Warehouse A ▾]        │ │
│  │ Status:     [All ▾]                │ │
│  │                   [Search] [Reset] │ │
│  └────────────────────────────────────┘ │
│                                          │
│  (Grid appears after search)             │
└──────────────────────────────────────────┘
```

- Displayed when tab first opens
- User fills in search parameters
- Clicking [Search] collapses form and displays results

#### 2. Form Collapsed (Results State)

```
┌──────────────────────────────────────────┐
│  Tab: Inventory Search (127 results)     │
├──────────────────────────────────────────┤
│  ▶ SKU: ABC*, Loc: Warehouse A [Modify] │
├──────────────────────────────────────────┤
│  ┌────────────────────────────────────┐ │
│  │ Data Grid (AG Grid)                │ │
│  │ ┌───┬─────────┬────────────┬────┐ │ │
│  │ │☑│ SKU     │ Description │Qty │ │ │
│  │ ├───┼─────────┼────────────┼────┤ │ │
│  │ │☐│ ABC-123 │ Widget     │50  │ │ │
│  │ │☐│ ABC-124 │ Widget Blue│45  │ │ │
│  │ └───┴─────────┴────────────┴────┘ │ │
│  │ Showing 1-5 of 127      [<][>]    │ │
│  └────────────────────────────────────┘ │
│                                          │
│  Actions: [Export] [Adjust] [Transfer]  │
└──────────────────────────────────────────┘
```

- Form collapses to single-line summary after search
- Shows active filter values in collapsed state
- [Modify] or [▶] expands form to change parameters
- Grid takes up majority of tab space
- Actions bar at bottom operates on selected rows

### Form Collapse/Expand Behavior

- **Initial:** Form expanded, grid hidden
- **After [Search]:** Form collapses to summary, grid shows results
- **Click [Modify] or ▶:** Form expands, grid remains visible (scrolls down)
- **After modify → [Search]:** Form collapses again, grid updates
- **[Reset]:** Clears form, collapses form, hides grid (back to initial state)

### Components within Tab

1. **Parameter Form** (collapsible)
   - Input fields for search/filter criteria
   - Submit button triggers data fetch and collapse
   - Reset button clears form and collapses
   - Collapsed: single-line summary with active filters

2. **Data Grid** (primary content)
   - Tabular results from query
   - Column headers with sort indicators
   - Row selection (single or multi)
   - Pagination controls
   - Only visible after successful search

3. **Actions Bar** (bottom)
   - Buttons for operations on selected rows
   - Enabled/disabled based on selection
   - May prompt for additional input via modal

### Federated Screen

Embedded external application:

```
┌──────────────────────────────────────────┐
│  Tab: Legacy System                      │
├──────────────────────────────────────────┤
│  ┌────────────────────────────────────┐ │
│  │  <iframe src="external.app">       │ │
│  │                                    │ │
│  │  [Legacy application renders here] │ │
│  │                                    │ │
│  └────────────────────────────────────┘ │
│                                          │
│  [Open Externally] [Reload]              │
└──────────────────────────────────────────┘
```

- Full-height iframe or embed
- Optional toolbar for workspace actions
- Same tab lifecycle as canonical screens

## User Interaction Flows

### Flow 1: Search → Results

1. User opens "Inventory Search" from sidebar
2. New tab opens with **expanded form**, no grid visible
3. User fills form: SKU="ABC*", Location="Warehouse A"
4. User clicks [Search]
5. **Form collapses** to single-line summary: "▶ SKU: ABC*, Loc: Warehouse A [Modify]"
6. **Grid appears** and populates with matching results
7. Tab title updates: "Inventory Search (127)"

### Flow 1a: Modify Search

1. User has results displayed (form collapsed)
2. User clicks [Modify] button or ▶ icon
3. **Form expands** showing all search fields with current values
4. Grid remains visible below (user can scroll)
5. User changes Location="Warehouse B"
6. User clicks [Search]
7. **Form collapses** again with updated summary
8. Grid refreshes with new results

### Flow 2: Drilldown → Child Screen

1. User has results in "Inventory Search" tab
2. User selects row: SKU="ABC-123"
3. User clicks action [View Details] or double-clicks row
4. New tab opens: "Item ABC-123"
5. Form pre-filled with `itemId` from parent row
6. Child screen auto-loads details
7. Parent tab remains open in background

### Flow 3: Action with Prompt

1. User selects multiple rows in grid
2. User clicks action [Adjust Quantity]
3. Modal dialog appears with prompt form:
   - Adjustment: [+10] (input)
   - Reason: [Cycle Count] (dropdown)
4. User submits
5. Provider executes action
6. Grid refreshes with updated quantities
7. Toast notification: "3 items updated"

### Flow 4: Session Restoration

1. User has 3 tabs open:
   - "Inventory Search (127)" - form collapsed, grid showing results
   - "Order #1234" (pinned) - detail screen
   - "Shipping Queue" - form expanded, no results yet
2. User closes browser
3. User reopens application
4. All 3 tabs restore in same order
5. Active tab selection restored
6. **Form states preserved** (collapsed/expanded)
7. Grid results may need refresh (optional: cache vs re-query)
8. User continues work without re-navigation

## Keyboard Shortcuts

- `Ctrl+K` - Focus global search
- `Ctrl+W` - Close active tab
- `Ctrl+Tab` - Next tab
- `Ctrl+Shift+Tab` - Previous tab
- `Ctrl+1..9` - Switch to tab 1-9
- `Ctrl+F` - Focus grid filter
- `Enter` - Submit form / open selected row
- `Esc` - Clear selection / close dialog

## Responsive Considerations

- **Desktop first** - Optimized for operational users at workstations
- **Minimum width** - 1280px recommended
- **Sidebar** - Auto-collapses below 1024px
- **Tabs** - Overflow menu for narrow screens
- **No mobile** - Not designed for phone/tablet (out of scope)
