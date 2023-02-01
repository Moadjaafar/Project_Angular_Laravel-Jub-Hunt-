import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  IslogedIn() {
    var token=localStorage.getItem('token');
    if(token == 'null'){

      return false;
    }else{
      return true;
    }
  }
}
