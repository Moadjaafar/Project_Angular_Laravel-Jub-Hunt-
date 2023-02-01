import { Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { DataserviceService } from '../dataservice.service';
import { Router, RouterModule, Routes } from '@angular/router';
import jwt_decode from 'jwt-decode';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {
  data:any;

  user:any;
  token:any;
  dor:any;
  constructor(protected dataserv: DataserviceService,protected router:Router,protected f:AppComponent){
  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.token=localStorage.getItem('token');
    console.log('toooo')
    console.log(this.token)
    if(this.token == 'null'){

      this.f.ngOnInit()
    }
  }
}
