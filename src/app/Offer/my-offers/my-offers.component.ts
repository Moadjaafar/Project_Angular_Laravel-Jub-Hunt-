import { Component } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { DataserviceService } from 'src/app/dataservice.service';
import jwt_decode from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-my-offers',
  templateUrl: './my-offers.component.html',
  styleUrls: ['./my-offers.component.css']
})
export class MyOffersComponent {
  constructor(protected dataserv: DataserviceService,protected router:Router,private toastr: ToastrService){
  }
  Offers:any;
  Toke:any=localStorage.getItem('token');
  token:any;

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.showMyArticles();
  }
  $id:any;
  showMyArticles(){
    this.token=jwt_decode(this.Toke);
    this.$id=this.token.user_id;
    this.Offers=this.dataserv.listMyOffers(this.$id).subscribe(article =>{
      if(article==1){
        this.toastr.info('YOU DID NOT CREATE ANY OFFER');

      }else{
      this.Offers=article;
    }
    })

  }
  IslogedIn() {
    var token=localStorage.getItem('token');
    if(token == 'null'){

      return false;
    }else{
      return true;
    }
  }
  DeleteOffer($ide:any){
    this.Offers=this.dataserv.DeleteMyOffers($ide).subscribe(article =>{
      if(article==1){
        this.toastr.info('YOU DONT HAVE ANY OFFER')
      }else{
      this.Offers=article;
      this.toastr.info('OFFER DELETED SUCCESSFUL')
    }
    this.ngOnInit()
    })
  }
  listpeaples: any;
  peapleApply($ide:any){
    this.dataserv.listpeaple($ide).subscribe(article =>{
      if(article!=undefined){
        this.listpeaples=article;
      console.log(this.listpeaples);
      }else{
        console.log(0);
      }


    })
  }
  link:any
  downloadcv($ide:any){
    this.dataserv.DownloadCV($ide).subscribe(article =>{


    })
  }
}
