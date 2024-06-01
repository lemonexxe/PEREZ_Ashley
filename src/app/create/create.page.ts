import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { Router } from '@angular/router';
import { User } from '../home/home.model';

@Component({
  selector: 'app-create',
  templateUrl: './create.page.html',
  styleUrls: ['./create.page.scss'],
})
export class CreatePage implements OnInit {

  users: User = new User();
  Drinks: string[] = [
    'Water', 'Coke', 'Sprite', 'Royal', 'Pineapple juice', 'Lemonade', 'red tea' ];

  constructor(private auth: AuthenticationService, private router: Router) { }

  async createUser() {
    if (this.validation()) {
      if (!this.users.id) {
        this.auth.addUser(this.users);
        this.auth.presentAlert('Success', 'Orders added successfully!')
      }
      this.users = new User();
      this.router.navigate(['home']);
    }
  }

  home() {
    this.router.navigate(['home']);
  }
  validation() {
    if (!this.users.main) {
      this.auth.presentToast('Please fill in the Main Dish.', 3000);
      return false;
    }
    if (!this.users.side) {
      this.auth.presentToast('Please fill in the Side dish.', 3000);
      return false;
    }
    if (!this.users.preferred) {
      this.auth.presentToast('Please fill in the preferred place.', 3000);
      return false;
    }
    if (!this.users.Drinks) {
      this.auth.presentToast('Please fill in the Drinks.', 3000);
      return false;
    }
    return true; // Return true if all validations pass
  
  }

  ngOnInit() {
  }

}
