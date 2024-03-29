import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.css']
})
export class SellerAddProductComponent {

  addProductMessage:string|undefined;
  constructor(private product: ProductService){}

  ngOnInit(): void{

  }

  createProduct(data: Product){
    this.product.addProduct(data).subscribe((result)=>{
      console.warn(result);
      if(result){
        this.addProductMessage = "Product succfully added";
      }
      setTimeout(()=>this.addProductMessage = undefined, 3000);
    });
    
  }

}
