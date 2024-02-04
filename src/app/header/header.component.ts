import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  menuType: string = 'default';
  sellerName: string = '';
  constructor(private router: Router){}

  ngOnInit(){
    this.router.events.subscribe((value: any)=>{
      // console.log(value.url);
      if(value.url){
        if(localStorage.getItem('seller') && value.url.includes('seller')){
          // console.warn("In seller area ");
          this.menuType = 'seller';
          if(localStorage.getItem('seller')){
            let sellerStore = localStorage.getItem('seller');
            let sellerData = sellerStore && JSON.parse(sellerStore)[0];
            this.sellerName = sellerData.name;
          }
        }else {
          // console.warn("Outside seller");
          this.menuType = 'default';
        }
      }
    });
  }

  logOut(){
    localStorage.removeItem('seller');
    this.router.navigate(['/']);
  }

}
