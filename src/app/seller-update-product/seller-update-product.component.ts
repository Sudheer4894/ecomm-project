import { Component } from '@angular/core';
import { Product } from '../data-type';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.css']
})
export class SellerUpdateProductComponent {


  updateProductMessage:undefined | string;
  productData:undefined | Product;

  constructor(private route: ActivatedRoute, private product: ProductService){}

  ngOnInit(){
    let productId = this.route.snapshot.paramMap.get('id');

    console.log("Hello Users",productId);
    productId && this.product.getProduct(productId).subscribe((data)=>{
      console.log(data);
      this.productData = data;
      
    });
    
  }

  updateProduct(data: Product){
    console.log(data); 
    if(this.productData){
      data.id = this.productData.id;
      console.log(data);
    }
    this.product.updateProduct(data).subscribe((result)=>{
      if(result){
        this.updateProductMessage = "Product has updated!";
      }
    });
    setTimeout(()=>{
      this.updateProductMessage = undefined;
    }, 3000);
  }

}
