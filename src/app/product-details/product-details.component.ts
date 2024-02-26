import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent {

  productData: undefined | Product;
  productQuantity: number = 1;
  constructor(private activatedRoute:ActivatedRoute, private product:ProductService){}

  ngOnInit(){
    let productId = this.activatedRoute.snapshot.paramMap.get('productId');
    // console.log(productId);   
    productId && this.product.getProduct(productId).subscribe((result)=>{
      // console.log("Product Data",result);
      this.productData = result
    });
  }

  handleQuantity(value:string){
    if (this.productQuantity < 20 && value === 'plus'){
      this.productQuantity += 1;
    } else if(this.productQuantity > 1 && value === 'min'){
      this.productQuantity -= 1;
    }
  }

  addToCart(){
    if(this.productData){
      this.productData.quantity = this.productQuantity;
      if(!localStorage.getItem('user')){
        this.product.localAddToCart(this.productData);
      }
    }
  }
}
