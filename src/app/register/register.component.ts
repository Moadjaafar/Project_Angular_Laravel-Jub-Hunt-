import { Component } from '@angular/core';
import { FormBuilder , FormGroup ,Validators } from '@angular/forms';
import { DataserviceService } from '../dataservice.service';
import jwt_decode from 'jwt-decode';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  //form: FormGroup | undefined;
  data:any;

  constructor(protected fb: FormBuilder,protected dataserv: DataserviceService){
  }

  /*createform(){
      this.form = this.fb.group({
        name: [null, Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required]
      });
    }*/
    token:any;
    dor:any;
    ngOnInit(): void {
      //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
      //Add 'implements OnInit' to the class.
      this.token=localStorage.getItem('token');
      this.dor=jwt_decode(this.token);
      console.log(this.dor.email)



    }

    user:any;
    submit(nameuser:string,emailuser:string,passuser:string){

      this.user={
        'name':nameuser,
        'email':emailuser,
        'password':passuser
      };
      console.log(this.user);
      this.dataserv.Registeruser(this.user).subscribe(res => {
        this.data=res;
        console.log(this.data);
      })
    }

}


