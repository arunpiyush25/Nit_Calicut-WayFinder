import { Injectable, OnInit} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MyserviceService implements OnInit {

  constructor() { 
    
  }

  ngOnInit(): void {

  }

  fun2(va:any){
    console.log(va, 'service')
  }
  
}
