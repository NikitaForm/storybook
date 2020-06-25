import { Directive, Input, Output, EventEmitter, ElementRef, OnInit } from '@angular/core';

import { Observable, fromEvent } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

export interface Viewport {
    width: number;
    height: number;
}

export type InfiniteScrollContext = 'self' | 'document';

@Directive({
    selector: '[infiniteScroll]',
})
export class InfiniteScrollDirective implements OnInit {
    private el: any;
    private viewport: Viewport;
    private scrollEvent$: Observable<any>;

    @Input() infiniteScrollContext: InfiniteScrollContext = 'document';
    @Output() infiniteScrollAction: EventEmitter<any> = new EventEmitter();

    constructor(private element: ElementRef) {
        this.el = element.nativeElement;
        this.viewport = this.getViewport(window);
    }

    ngOnInit() {
        if (this.infiniteScrollContext === 'self') {
            this.scrollEvent$ = fromEvent(this.el, 'scroll').pipe(debounceTime(250));

            this.scrollEvent$.subscribe((e: any) => {
                if (e.target.scrollTop + e.target.offsetHeight >= e.target.scrollHeight) {
                    this.infiniteScrollAction.emit(null);
                }
            });
        } else if (this.infiniteScrollContext === 'document') {
            this.scrollEvent$ = fromEvent(window.document, 'scroll').pipe(debounceTime(250));

            this.scrollEvent$.subscribe(() => {
                const rect = this.el.getBoundingClientRect();
                const elementTopRelativeToViewport = rect.top;
                const elementTopRelativeToDocument = elementTopRelativeToViewport + window.pageYOffset;
                const scrollableDistance = this.el.offsetHeight + elementTopRelativeToDocument;
                const currentPos = window.pageYOffset + this.viewport.height;

                if (currentPos > scrollableDistance) {
                    this.infiniteScrollAction.emit(null);
                }
            });
        }
    }

    private getViewport(win: Window): Viewport {
        if (win.innerWidth != null) {
            return {
                width: win.innerWidth,
                height: win.innerHeight
            };
        }

        const d = win.document;

        if (document.compatMode === 'CSS1Compat') {
            return {
                width: d.documentElement.clientWidth,
                height: d.documentElement.clientHeight
            };
        }

        return {
            width: d.body.clientWidth,
            height: d.body.clientHeight
        };
    }
}
