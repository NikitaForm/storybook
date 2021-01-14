import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'op-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.scss']
})
export class PdfComponent implements OnChanges {
  @Input() src: Blob;
  file$ = new BehaviorSubject(null);
  loaded = false;

  get pdfLink$(): Observable<string> {
    return this.file$.asObservable();
  }

  constructor(private sanitizer: DomSanitizer) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.src.currentValue) {
      this.readDoc();
    }
  }

  readDoc(): void {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      this.loaded = true;
      this.file$.next(reader.result);
    }, false);

    reader.readAsDataURL(this.src);
  }
}
