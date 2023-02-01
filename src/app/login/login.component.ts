import { Component } from '@angular/core';
import { DataserviceService } from '../dataservice.service';
import jwt_decode from 'jwt-decode';
import { Router, RouterModule, Routes } from '@angular/router';
import { AppComponent } from '../app.component';
import { NgModule } from '@angular/core';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  data:any;
  alert:any=false;
  autohide:any
  constructor(protected dataserv: DataserviceService,protected router:Router,protected f:AppComponent,private toastr: ToastrService){
  }
  user:any;
  token:any;
  dor:any;
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.

  }
  //console.log(this.dor);

    submit(useremail:string,userpass:string){
      if(useremail==""||userpass==""){
        this.toastr.info('Email and Password required');

      }else{
        this.user={
          'email':useremail,
          'password':userpass,

        };
        this.dataserv.Loginruser(this.user).subscribe(res => {
          this.data=res;
          if(this.data.status==1){
            localStorage.setItem('token',this.data.data.token)

            this.toastr.success('Login Successful');

            this.router.navigate(['/AllOffers']);

          }else{
            this.toastr.warning('Email Or Password Incorrect!');

          }
        })
      }


    }
}
