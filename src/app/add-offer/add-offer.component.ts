import { Component } from '@angular/core';
import { DataserviceService } from '../dataservice.service';
import { Token } from '@angular/compiler';
import jwt_decode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-add-offer',
  templateUrl: './add-offer.component.html',
  styleUrls: ['./add-offer.component.css']
})
export class AddOfferComponent {
  Offer:any;
  Title:any;
  Description:any;
  Ville:any;
  Category:any;
  constructor(protected dataserv:DataserviceService,private toastr: ToastrService) {
  }
  Toke:any=localStorage.getItem('token');
  token:any;
  add(offertitle:string,offerdescript:string,offervill:string,offercatt:string){
    if(offertitle==""||offerdescript==""||offervill==""||offercatt==""){
      this.toastr.warning('Please enter all information!');

    }else{
      this.token=jwt_decode(this.Toke);
    this.Offer={
      'Title':offertitle,
      'Description':offerdescript,
      'Ville':offervill,
      'Category':offercatt,
      'user_id':this.token.user_id

    };

    this.dataserv.AddOffer(this.Offer as any).subscribe(article=>{
      this.Offer = article;
    });
    this.Title=''
    this.Description=''
    this.Ville=''
    this.Category=''
    this.toastr.success('Offer added successfully');


    }

  }
}
