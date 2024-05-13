import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection, getFirestore, getDocs, updateDoc, doc, deleteDoc } from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { environment } from 'src/environments/environment';
import { iUser, User } from 'src/app/home/home.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  newUserList: iUser[] = [];
  users: User = new User();
  isLoading: boolean = false;
  canProceed = false;

  constructor(private router: Router, private alertController: AlertController, private toastController: ToastController) { }

  canActivate() {
    if (localStorage.getItem("loggedIn") == "true") {
      return true;
    }
    this.router.navigate(['login']);
    return false
  }

  setAuthentication(auth: boolean) {
    if (auth == true) {
      localStorage.setItem("loggedIn", "true");
    } else (
      localStorage.setItem("loggedIn", "false")
    )
  }

  async signup(email: string, password: string, confirmPassword: string) {
    if (!email || !password || !confirmPassword) {
      this.presentAlert('Error', 'Please fill out all fields.');
      return;
    }

    if (password !== confirmPassword) {
      this.presentAlert('Error', 'The passwords you entered do not match.');
      return;
    }

    if (!email.includes('@')) {
      this.presentToast('Please enter a valid email address with @ symbol.', 3000);
      return;
    }

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password).then((userCredential) => {
      const user = userCredential.user;
      this.presentAlert('Success', 'Signup successful! You can now login with your new account.');
      this.router.navigate(['login']);
    })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        if (errorMessage.includes("Error (auth/email-already-in-use)")) {
          this.presentAlert('Error', 'This email is already in use.');
        } else if (errorMessage.includes("Error (auth/invalid-email).")) {
          this.presentAlert('Error', 'The email address you entered is not valid.');
        }
      })
  }

  async presentAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async presentToast(message: string, duration: number) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration
    });
    toast.present();
  }

  async login(email: string, password: string) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
      const user = userCredential.user;
      this.setAuthentication(true);
      this.presentAlert('Success', 'Login successful!');
      this.router.navigate(['home']);
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log(error);
      if (errorMessage.includes("Error (auth/invalid-credential)")) {
        this.presentAlert('Error', 'The email or password you entered is incorrect.');
      } else if (errorMessage.includes("Error (auth/invalid-email).")) {
        this.presentAlert('Error', 'The email address you entered is not valid.');
      }
    })
  }

  async getUsers(): Promise<iUser[]> {
    const app = initializeApp(environment.firebaseConfig);
    const firestore = getFirestore(app);

    const users: User[] = [];

    const querySnapshot = await getDocs(collection(firestore, 'users'));
    querySnapshot.forEach((doc) => {
      const user = doc.data() as User;
      user.id = doc.id;
      users.push(user);
    });
    return users
  }

  async addUser(user: User) {
    const app = initializeApp(environment.firebaseConfig);
    const firestore = getFirestore(app);

    try {
      const docID = await addDoc(collection(firestore, "users"), {
        title: user.title,
        Writer: user.Writer,
        releaseDate: user.releaseDate,
        isRated: user.isRated,
        genres: user.genres
      });
      console.log("Document with ID: ", docID.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  async deleteUser(user: User) {
    const app = initializeApp(environment.firebaseConfig);
    const firestore = getFirestore(app);

    try {
      const docRef = doc(firestore, "users", user.id)
      await deleteDoc(docRef);
    } catch (e) {
      console.error("Delete error: ", e);
    }
  }

  async updateUser(user: User) {
    const app = initializeApp(environment.firebaseConfig);
    const firestore = getFirestore(app);

    try {
      const docRef = doc(firestore, "users", user.id);
      await updateDoc(docRef, { title: user.title, artist: user.Writer, releaseDate: user.releaseDate, genres: user.genres, isExplicit: user.isRated });
    } catch (e) {
      console.error("Error update document: ", e);
    }
  }

  edit(user: iUser) {
    this.users = user;
  }
}

