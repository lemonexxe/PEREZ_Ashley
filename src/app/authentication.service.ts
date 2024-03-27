import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authentication = false;
  constructor() { }

  canActivate() {
    return this.authentication;
  }
}
