import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  menuType: string = 'default';
  sellerName: string = '';
  searchResult:undefined|Product[];
  constructor(private router: Router, private product: ProductService){}

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

  searchProduct(query:KeyboardEvent){
    if (query){
      const element = query.target as HTMLInputElement;
      // console.log(element.value);
      this.product.searchProduct(element.value).subscribe((result)=>{
        // console.log("Result:", result);
        if (result.length>5){
          result.length=length;
        }
        this.searchResult=result;
      });
    }
  }

  hideSearch(){
    this.searchResult = undefined;
  }
}
