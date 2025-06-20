import { Component, OnInit } from '@angular/core';

import MojoAuth from 'mojoauth-web-sdk'
import { Router } from '@angular/router';
import { MyserviceService } from './myservice.service';

@Component({
  selector: 'app-otplogin',
  templateUrl: './otplogin.component.html',
  styleUrls: ['./otplogin.component.css']
})
export class OtploginComponent implements OnInit {
 
  token:any;
  data:any;
  constructor( private router: Router, private myService: MyserviceService) {}
  ngOnInit(): void {
    const mojoauth = new MojoAuth("0191868e-12d5-4947-bc3a-da2de9cb96df", {
      language: 'en',
      source: [{ type: "email", feature: "otp" }],
    })
    
    mojoauth.signIn().then((response: JSON) => {
      this.data = JSON.stringify(response, null, 4)
      console.log(response)

      this.fun(response)
    })
  }
  fun(val: any){
    console.log('hi', val)
    if(val.authenticated){
      this.router.navigate(['/'])
      setTimeout(() => {
        this.router.navigate(['/home', {vl: val.user.identifier}])
      }, 1);
      this.token = val.oauth.id_token
      console.log(this.token)
    }
  }
}
