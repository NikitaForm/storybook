import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-main-landing-screen',
  templateUrl: './main-screen.component.html',
  styleUrls: ['./main-screen.component.scss']
})
export class MainLandingScreenComponent implements OnInit {
  @Output() showProfile = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  navigateToProfile() {
    this.showProfile.emit();
  }

}
