import { Injectable } from '@angular/core';
import {HttpClient , HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class DataserviceService {

  constructor(public http:HttpClient) { }
  url:string = 'http://localhost:8000';

  public Registeruser($data:any){
    return this.http.post(this.url+'/api/register',$data);
  }

  public Loginruser($data:any){
    return this.http.post(this.url+'/api/login',$data);
  }

  public AddOffer($data:any){
    return this.http.post(this.url+'/api/AddOffer',$data);
  }
  update($id: any,$data:any){
    return this.http.put(this.url+'/api/UpdateOfr/'+$id,$data);
  }
  listOffers(){
    return this.http.get<any>(this.url+'/api/AllOffers');
  }
  firstOffer(){
    return this.http.get<any>(this.url+'/api/firstOffer');
  }
  targitedOffer($id:any){
    return this.http.get<any>(this.url+'/api/targitedOffer/'+$id);
  }
  listMyOffers($id:any){
    return this.http.get<any>(this.url+'/api/MyOffers/'+$id);
  }
  DeleteMyOffers($id:any){
    return this.http.get<any>(this.url+'/api/DeleteOff/'+$id);
  }
  filter($id:any){
    return this.http.post<any>(this.url+'/api/filter',$id);
  }
  public uploadpdf($data:any) {
    return this.http.post(this.url+'/api/pdf',$data);
  }
  public DownloadCV($id:any) {
    return this.http.get(this.url+'/api/pdfDownload/'+$id);
  }

  public listpeaple($id:any) {
    return this.http.get(this.url+'/api/Peapleintersted/'+$id);
  }

}
