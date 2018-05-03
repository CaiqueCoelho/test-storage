import { Component, OnInit } from '@angular/core';
import { SimpleNotificationsComponent } from 'angular2-notifications';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  public toastNotificationsOptions = {
    timeOut: 5000,
    showProgressBar: false,
    pauseOnHover: false,
    clickToClose: true,
    maxLength: 30
  };

  constructor() { }

  ngOnInit() {
  }

}
