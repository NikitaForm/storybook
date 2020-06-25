/* tslint:disable:no-input-rename */

import {
  ComponentFactory,
  ComponentFactoryResolver,
  ComponentRef,
  Directive,
  DoCheck,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChange,
  ViewContainerRef
} from '@angular/core';

import { AbstractControl } from '@angular/forms';
import { PopoverContentComponent } from './popover-content';
import { Subscription } from 'rxjs';
// declare var jQuery: JQueryStatic;

@Directive({
  selector: '[validationTooltip]'
})
export class ValidationTooltipDirective implements OnInit, OnDestroy, DoCheck {
  @Input('validationTooltip') formControl: AbstractControl;
  @Input() validationMessages: { [id: string]: string };

  subs: Subscription;

  protected popoverComponent = PopoverContentComponent;
  protected popover: ComponentRef<PopoverContentComponent>;
  protected visible: boolean;

  // private popover: any;
  private formGroupEl: any;
  private currentError: string;

  constructor(
    private el: ElementRef,
    protected viewContainerRef: ViewContainerRef,
    protected resolver: ComponentFactoryResolver
  ) {
    this.currentError = null;
  }

  getElement(): any {
    return this.viewContainerRef.element.nativeElement;
  }

  ngOnInit(): void {
    // this.formGroupEl = this.el.nativeElement.closest('.form-group');

    // this.popover = this.el.nativeElement.popover({
    //   trigger: 'manual',
    //   placement: 'top',
    //   html: true,
    //   container: this.el.nativeElement.closest('form')
    // });

    // this.subs = this.formControl.parent.statusChanges.subscribe(value => {
    //   this.checkError();
    // });
  }

  ngDoCheck(): void {
    this.checkError();
  }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  needShow(): boolean {
    return !this.formControl.valid && (this.formControl.dirty || this.formControl.touched);
    // return !this.formControl.valid && this.formControl.dirty;
  }

  needClose(): boolean {
    return this.formControl.valid;
    // return this.formControl.valid || !this.formControl.dirty;
  }

  // private showError(error: string): void {
  //   const errorMessage = this.validationMessages[error];
  //   this.popover.data('bs.popover').options.content = errorMessage;

  //   this.formGroupEl.addClass('has-error');
  //   this.popover.popover('show');
  // }

  checkError(): void {
    if (this.needShow()) {
      if (!this.formControl.errors) {
        return;
      }

      const error = Object.keys(this.formControl.errors)[0];

      if (error !== this.currentError) {
        if (this.currentError) {
          this.hideError();
        }
        this.showError(error);
        this.currentError = error;
      }
    }

    if (this.needClose() && this.currentError) {
      this.hideError();

      this.currentError = null;
    }
  }

  showError(error: string): void {
    const errorMessage = this.validationMessages[error];

    if (this.visible) {
      return;
    }

    this.visible = true;
    const factory = this.resolver.resolveComponentFactory(this.popoverComponent);
    if (!this.visible || !errorMessage || !errorMessage.length) {
      return;
    }

    this.popover = this.viewContainerRef.createComponent(factory);
    const popover = this.popover.instance as PopoverContentComponent;
    popover.popover = this;
    popover.content = errorMessage;
    popover.placement = 'top';
    popover.animation = true;
    popover.title = null;
    popover.closeOnClickOutside = false;
    popover.closeOnMouseOutside = false;

    // popover.onCloseFromOutside.subscribe(() => this.hideError());

    // this.onShown.emit(this);
  }

  hideError(): void {
    if (!this.visible) { return; }

    this.visible = false;
    if (this.popover) {
      this.popover.destroy();
    }

    // if (this.content instanceof PopoverContentComponent) { (this.content as PopoverContentComponent).hideFromPopover(); }

    // this.onHidden.emit(this);
  }
}
