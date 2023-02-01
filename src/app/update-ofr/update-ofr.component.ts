import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router} from '@angular/router';
import { DataserviceService } from 'src/app/dataservice.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-ofr',
  templateUrl: './update-ofr.component.html',
  styleUrls: ['./update-ofr.component.css']
})
export class UpdateOfrComponent {
  constructor(private route:ActivatedRoute,private router:Router,private dataserv:DataserviceService,private toastr: ToastrService){}
  OfferId:any;
  Offer:any;
  Title:any;
  Description:any;
  Ville:any;
  Category:any;
  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const routeParams = this.route.snapshot.paramMap;
    this.OfferId = Number(routeParams.get('articleId'));
    this.dataserv.listMyOffers(this.OfferId).subscribe((data:any)=>{
      this.Offer=data;
    })
  }

  update(offertitle:string,offerdescript:string,offervill:string,offercatt:string){
    if(offertitle==""||offerdescript==""||offervill==""||offercatt==""){
      this.toastr.warning('Please enter all information!');

    }else{
      this.Offer={
        'Title':offertitle,
        'Description':offerdescript,
        'Ville':offervill,
        'Category':offercatt,
      };
      this.dataserv.update(this.OfferId,this.Offer as any).subscribe(article=>{
        this.Offer = article;
      });
      this.Title=''
      this.Description=''
      this.Ville=''
      this.Category=''
      this.toastr.success('Offer updated successfully');
    }



  }
}
