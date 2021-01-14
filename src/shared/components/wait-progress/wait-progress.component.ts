import { Component, OnInit, Input } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { interval } from 'rxjs/observable/interval';
import { map } from 'rxjs/operators';

@Component({
  selector: 'wait-progress',
  templateUrl: './wait-progress.component.html',
  styleUrls: ['./wait-progress.component.scss']
})
export class WaitProgressComponent implements OnInit {
  @Input() xo = false;
  progress$: Observable<string>;

  private PROGRESS_INTERVAL = 750;

  ngOnInit(): void {
    this.progress$ = interval(this.PROGRESS_INTERVAL).pipe(
      map(x => {
        switch (x % 4) {
          case 0:
            return '';
          case 1:
            return '.';
          case 2:
            return '..';
          case 3:
            return '...';
          default:
            return '';
        }
      })
    );
  }
}
