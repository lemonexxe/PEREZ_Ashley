import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UnivTurkey } from 'src/app/univ-turkey.model';
import { DataServiceService } from 'src/app/data-service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  turkU : UnivTurkey[] = [];
  data : any;
  id : any;
  userName : any;

  constructor(
    private router : Router,
    private dataService : DataServiceService
  ) { }

  // viewing the public api in the dashboard
  ngOnInit() : void {
      this.dataService.fetchData().subscribe(item => {
      this.turkU = item;
      this.turkU = this.data.slice(0, 10);
    })
    // session variable 
    this.userName = localStorage.getItem('userName'); 
  }

  logOut() {
    this.router.navigate(['login']);
    localStorage.removeItem('userName'); 
  }
}
