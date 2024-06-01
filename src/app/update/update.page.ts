import { Component, OnInit } from '@angular/core';
import { User, iUser } from '../home/home.model';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-update',
  templateUrl: './update.page.html',
  styleUrls: ['./update.page.scss'],
})
export class UpdatePage implements OnInit {

  users: User = new User();
  id: any;

  Drinks: string[] = [
    'Water', 'Coke', 'Sprite', 'Royal', 'Pineapple juice', 'Lemonade', 'red tea' ];

  constructor(private route: ActivatedRoute, private auth: AuthenticationService, private router: Router) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get('id');
    this.synchUpdate(this.auth.newUserList);
  }

  async updateUser() {
    if (this.validation()) {
      if (this.users.id) {
        this.auth.updateUser(this.users);
        this.auth.presentAlert('Success', 'Orders updated successfully!')
      }
      this.users = new User();
      this.router.navigate(['home']);
    }
  }

  home(){
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
    return true;
  }

  synchUpdate(users: iUser[]) {
    users.forEach(user => {
      if (this.id == user.id) {
        this.users.id = user.id;
        this.users.main = user.main;
        this.users.side = user.side;
        this.users.Drinks = user.Drinks;
        this.users.preferred = user.preferred;
      }
    });
  }
}

