import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private Auth: AuthService,private router:Router){}
  canActivate(){
    if(this.Auth.IslogedIn()==true){
    return true;
    }else{

      this.router.navigate(['']);
      return false;
    }
  }

}
