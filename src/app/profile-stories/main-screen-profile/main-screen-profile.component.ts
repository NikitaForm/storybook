import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'main-screen-profile',
  templateUrl: './main-screen-profile.component.html',
  styleUrls: ['./main-screen-profile.component.scss']
})
export class MainScreenProfileComponent implements OnInit {

  constructor() { }
  today = new Date();

  ngOnInit() {
  }

  navigateToProfile() {
  }

}
