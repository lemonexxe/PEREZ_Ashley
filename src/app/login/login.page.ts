import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(
    private alertController: AlertController,
    private router: Router,
    private authentication: AuthenticationService,
    private toastController: ToastController
  
  ) { }

  userName: string = "";
  userPass: string = "";

  async login() {
    if (this.userPass == 'abcdef') {
      const alert = await this.alertController.create({
        header: 'Success',
        subHeader: 'Welcome',
        message: 'Welcome, ' + this.userName,
        buttons: ['OK']
      });
      await alert.present();
      setTimeout(() => {
        this.router.navigate(['home']);
      }, 1000)
    }
      else {
        return this.loginFailed();
      }
  }

  async loginFailed() {
    const toast = await this.toastController.create({
      message: 'Login failed.',
      duration: 2500
    });
    toast.present();
  }


  ngOnInit() {
  }

}
