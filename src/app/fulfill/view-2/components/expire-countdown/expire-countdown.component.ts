import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MinutesToTimePipe } from '../../../../../shared/pipes';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'expire-countdown-2',
  styleUrls: ['./expire-countdown.component.scss'],
  templateUrl: './expire-countdown.component.html'
})
export class ExpireCountdown2Component implements OnInit, OnDestroy {
  @Input() expirationDate: Date;
  intervalId;
  expireCountdownText: string;

  constructor(private timeTransformPipe: MinutesToTimePipe,
              private cdr: ChangeDetectorRef) {
  }

  ngOnInit() {
    this.setExpireCountdownText();
    this.intervalId = setInterval(
      () => {
        this.setExpireCountdownText();
        this.cdr.detectChanges();
      }, 60000);
  }

  setExpireCountdownText() {
    if (!this.expirationDate) {
      this.expireCountdownText = '';
    } else {
      if (this.expirationDate.getTime() < Date.now()) {
        this.expireCountdownText = 'Expired!';
      } else {
        this.expireCountdownText = 'Expires in ' +
          this.timeTransformPipe.transform(Math.trunc((this.expirationDate.getTime() - Date.now()) / 60000));
      }
    }
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
}
