import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable()
export class ClipboardService {
  private tempTextArea: HTMLTextAreaElement | undefined;

  constructor(@Inject(DOCUMENT) public document: Document) { }

  public copy(value: string): Promise<string> {
    return new Promise((resolve) => {
      try {
        this.tempTextArea = this.createTextArea();
        this.document.body.appendChild(this.tempTextArea);
        this.tempTextArea.value = value;
        this.tempTextArea.select();
        this.copyText();
        resolve(value);
      } finally {
        this.destroy();
      }
    });
  }

  public copySync(value: string): void {
    try {
      this.tempTextArea = this.createTextArea();
      this.document.body.appendChild(this.tempTextArea);
      this.tempTextArea.value = value;
      this.tempTextArea.select();
      this.copyText();
    } finally {
      this.destroy();
    }
  }

  public destroy() {
    if (this.tempTextArea) {
      this.tempTextArea.parentNode.removeChild(this.tempTextArea);
      this.tempTextArea = undefined;
    }
  }

  private createTextArea(): HTMLTextAreaElement {
    let ta: HTMLTextAreaElement;
    ta = this.document.createElement('textarea');
    ta.style.fontSize = '12pt';
    ta.style.border = '0';
    ta.style.padding = '0';
    ta.style.margin = '0';
    ta.style.position = 'absolute';
    const yPosition = window.pageYOffset || this.document.documentElement.scrollTop;
    ta.style.top = yPosition + 'px';
    ta.setAttribute('readonly', '');
    return ta;
  }

  private copyText(): boolean {
    return this.document.execCommand('copy');
  }


}
