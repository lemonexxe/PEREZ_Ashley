import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginPage } from '../login/login.page';
import { DataServiceService } from '../data-service.service';
import { UnivTurkey } from '../univ-turkey.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  username: any;
  
  constructor(
  ) { }

  ngOnInit() {
  }
  
}
