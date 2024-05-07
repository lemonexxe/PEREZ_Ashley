import { Component, OnInit } from '@angular/core';
import { signInWithEmailAndPassword } from "firebase/auth";
import { getAuth } from 'firebase/auth';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = '';
  password: string = '';

 

  constructor(private authService: AuthService, private router: Router, private alertController: AlertController) { localStorage.setItem("Login", "false")}
    login() {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, this.email, this.password)
      .then((userCredential) => {
        const user = userCredential.user;
        this.authService.setAuthentication(true);
        this.presentAlert('Success', 'Log-in Successfully!');
        this.router.navigate(['home']);
      })

      

      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(error);
        this.presentAlert('Error', 'Invalid Password please try again.')
      });

      
}

goToSignUp() {
  this.router.navigate(['signup']);
}


  ngOnInit() {
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
