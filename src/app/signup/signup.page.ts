import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {
  email: string = '';
  password: string = '';
  reTypePassword: string = '';

  constructor(private alertController: AlertController, private router: Router) { }

  
  
  
  ngOnInit() {
  }

  async signUp() {
    if (!this.email || !this.password || !this.reTypePassword) {
      this.presentAlert('Error', 'Please fill all the fields.');
      return;
    }

    if (this.password !== this.reTypePassword) {
      this.presentAlert('Error', 'Password do not match.');
      return;
    }
    
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, this.email, this.password)
      .then((userCredential) => {

        const user = userCredential.user;
        this.presentAlert('Success', 'Sign-Up Successfully!');
        this.router.navigate(['login']);
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(error);
    });

    this.email = '';
    this.password = '';
    this.reTypePassword = '';
    
  }

  goToLogin() {
    this.router.navigate(['login']);
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }
}
