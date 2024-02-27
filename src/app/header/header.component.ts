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
  userName: string = "";
  searchResult:undefined|Product[];
  cartItems=0;
  constructor(private router: Router, private product: ProductService){}

  ngOnInit(){
    this.router.events.subscribe((value: any)=>{
      // console.log(value.url);
      if(value.url){
        if(localStorage.getItem('seller') && value.url.includes('seller')){
          // console.warn("In seller area ");
          this.menuType = 'seller';
          let sellerStore = localStorage.getItem('seller');
          let sellerData = sellerStore && JSON.parse(sellerStore)[0];
          this.sellerName = sellerData.name;
        }
        else if(localStorage.getItem('user')) {
          let userStore = localStorage.getItem('user');
          let userData = userStore && JSON.parse(userStore);
          this.userName = userData.name;
          this.menuType = 'user';
        }
        else {
          // console.warn("Outside seller");
          this.menuType = 'default';
        }
      }
    });
    let cartData = localStorage.getItem('localCart');
    if(cartData){
      this.cartItems = JSON.parse(cartData).length;
    }
    this.product.cartData.subscribe((items=>{
      this.cartItems = items.length;
    }));
  }

  logOut(){
    localStorage.removeItem('seller');
    this.router.navigate(['/']);
  }

  userLogout(){
    localStorage.removeItem('user');
    this.router.navigate(['/user-auth']);
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

  searchSubmit(searchValue:string){
    console.log("Search Value:", searchValue);
    this.router.navigate([`search/${searchValue}`]);
  }

  redirectTODetails(id:string){
    this.router.navigate(['/details/'+id]);
  }
}
