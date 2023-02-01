import { Component, SimpleChanges } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { LoginComponent } from './login/login.component';
import { Router, RouterModule, Routes } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  token:any
  acces:any
  loginaccess:any=true
  logoutaccess:any=false
  constructor(protected router:Router){}
  f=1
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
      this.token=localStorage.getItem('token');
      console.log(this.token)
      if(this.token == 'null'){
        this.logoutaccess=false;
        this.loginaccess=true;
        console.log(this.token)

      }else{
        this.loginaccess=false;
        this.logoutaccess=true;
      }


  }
  logout(){
    localStorage.setItem('token','null');
    this.router.navigate(['/Logout']);


  }


}
