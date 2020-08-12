import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'page-summary',
  templateUrl: './page-summary.component.html',
  changeDetection: ChangeDetectionStrategy.Default
})
export class PageSummaryComponent {
  protected _itemsPerPage: number;
  protected _totalItems: number;
  protected _currentPage: number;

  startIndex: number;
  endIndex: number;

  @Input()
  get totalItems(): number {
    return this._totalItems;
  }

  set totalItems(v: number) {
    this._totalItems = v;
    this.calculate();
  }

  @Input()
  get currentPage(): number {
    return this._currentPage;
  }

  set currentPage(v: number) {
    this._currentPage = v;
    this.calculate();
  }

  @Input()
  get itemsPerPage(): number {
    return this._itemsPerPage;
  }

  set itemsPerPage(v: number) {
    this._itemsPerPage = v;
    this.calculate();
  }

  private calculate(): void {
    if (!(this._currentPage && this._itemsPerPage && this._currentPage)) {
      return;
    }

    this.startIndex = (this._currentPage - 1) * this._itemsPerPage + 1;
    const i1 = this._currentPage * this._itemsPerPage;

    this.endIndex = i1 > this._totalItems ? this._totalItems : i1;
  }
}
