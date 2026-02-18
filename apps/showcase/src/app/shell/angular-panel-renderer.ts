import { ApplicationRef, ComponentRef, createComponent, EnvironmentInjector, Type } from '@angular/core';
import { IContentRenderer, IDockviewPanelProps } from 'dockview-core';

export interface PanelComponentInputs {
  [key: string]: unknown;
}

export class AngularPanelRenderer implements IContentRenderer {
  private readonly hostElement: HTMLElement;
  private componentRef?: ComponentRef<unknown>;

  constructor(
    private readonly componentType: Type<unknown>,
    private readonly environmentInjector: EnvironmentInjector,
    private readonly appRef: ApplicationRef,
    private readonly inputs: PanelComponentInputs = {}
  ) {
    this.hostElement = document.createElement('div');
    this.hostElement.style.height = '100%';
  }

  get element(): HTMLElement {
    return this.hostElement;
  }

  init(_params: IDockviewPanelProps): void {
    this.componentRef = createComponent(this.componentType, {
      environmentInjector: this.environmentInjector,
      hostElement: this.hostElement,
    });

    Object.entries(this.inputs).forEach(([key, value]) => {
      this.componentRef?.setInput(key, value);
    });

    this.appRef.attachView(this.componentRef.hostView);
  }

  dispose(): void {
    if (this.componentRef) {
      this.appRef.detachView(this.componentRef.hostView);
      this.componentRef.destroy();
      this.componentRef = undefined;
    }

    this.hostElement.remove();
  }
}
