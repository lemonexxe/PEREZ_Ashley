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
  genres: string[] = [
    'Action', 'Horror', 'Thriller', 'Drama', 'Sci-fi', 'Romance', 'Comedy', 'Fantasy', 'Crime', 'Animation',
    'Adventure', 'Western'  ];

  constructor(private auth: AuthenticationService, private router: Router) { }

  async createUser() {
    if (this.validation()) {
      if (!this.users.id) {
        this.auth.addUser(this.users);
        this.auth.presentAlert('Success', 'Movie added successfully!')
      }
      this.users = new User();
      this.router.navigate(['home']);
    }
  }

  home() {
    this.router.navigate(['home']);
  }

  validation() {
    if (!this.users.title) {
      this.auth.presentToast('Please fill in the Title.', 3000);
      return false;
    }
    if (!this.users.Writer) {
      this.auth.presentToast('Please fill in the Writer.', 3000);
      return false;
    }

    if (!this.users.releaseDate) {
      this.auth.presentToast('Please fill in the Released Date.', 3000);
      return false;
    }
    if (!this.users.isRated) {
      this.auth.presentToast('Please fill in the Rated.', 3000);
      return false;
    }
    if (!this.users.genres) {
      this.auth.presentToast('Please fill in the Genre', 3000);
      return false;
    }
    return true;
  }

  ngOnInit() {
  }

}
