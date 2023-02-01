import { Component, Input, SimpleChanges, getPlatform } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
import { DataserviceService } from 'src/app/dataservice.service';
import { PlatformRef } from '@angular/core';
import jwt_decode from 'jwt-decode';
import { AppComponent } from 'src/app/app.component';



@Component({
  selector: 'app-all-offers',
  templateUrl: './all-offers.component.html',
  styleUrls: ['./all-offers.component.css']
})
export class AllOffersComponent {

  constructor(protected dataserv: DataserviceService,protected router:Router,platform: PlatformRef,protected f:AppComponent){
  }
  Toke:any=localStorage.getItem('token');
  token:any;
  Offers:any;
  firstOffer:any;
  num=0;
  visible=true
  visibl=true
  file:any;
  data:any;
  message:any;
  too:any;
   mm=false
  uploadpdf(event:any){
    this.file = event.target.files[0];
    console.log(this.file);
  }
  onupload(nam:any){
    this.token=jwt_decode(this.Toke);
    var $id=this.token.user_id;
    const formdata=new FormData();


    formdata.append("pdf",this.file,this.file.name);
    formdata.append("full_name",nam);
    formdata.append("Offer_id",this.firstOffer.id);
    formdata.append("user_id",$id);


    console.log(this.message);
    this.dataserv.uploadpdf(formdata).subscribe(res=>{
      this.data=res;
      console.log(this.data);
    })

  }
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.IslogedIn()
    this.showArticles();
    if(this.num==0){
      this.firstOfferDetail();
    }
    this.f.ngOnInit()

    var tt=window.innerWidth;
    if(tt<835){

      this.mm=false
  }
  }
  showArticles(){
    this.dataserv.listOffers().subscribe(article =>{
      this.Offers=article;
    })
  }
  filter(ville:any,category:any){
   var dataa={
      'Ville':ville,
      'Category':category,

    };
    this.dataserv.filter(dataa).subscribe(article =>{
      this.Offers=article;
      this.firstOffer=article[0]

    })
  }

  OfferDetail(id:any){
    var tt=window.innerWidth;
    //var ell = document.getElementById("testt")
    if(tt<835){
        var ell = document.getElementById("testt")
        if(ell!=null){
          ell.className="chatlit"
        }
        this.visible=true
        this.visibl=false
        this.mm=true
    }
    this.dataserv.targitedOffer(id).subscribe(article =>{
      this.firstOffer=article;
      console.log(this.firstOffer.Ville);
      var tt=window.innerWidth;
      //var ell = document.getElementById("testt")
      if(tt<835){
          var ell = document.getElementById("testt")
          if(ell!=null){
            ell.className="chatlit"
          }
          this.visible=true
          this.visibl=false
          this.mm=true
      }
    })
  }
  close(){
    this.visible=false
    this.visibl=true
    this.mm=false
  }
  IslogedIn() {
    var token=localStorage.getItem('token');
    if(token == 'null'){

      this.router.navigate(['/Login']);;
    }
  }
  firstOfferDetail(){
    this.dataserv.firstOffer().subscribe(article =>{
      this.firstOffer=article;
      console.log(this.firstOffer.Ville);
    })
  }
}
function Platform() {
  throw new Error('Function not implemented.');
}

