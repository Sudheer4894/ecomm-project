import { Component } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';
import { faCoffee, faTrash, faEdit } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.css']
})
export class SellerHomeComponent {

  productList:undefined| Product[];
  deleteMessage:string|undefined;
  delete = faTrash;
  edit = faEdit;
  constructor(private product:ProductService){}

  ngOnInit(){
    this.productLists();
  }

  productLists(){
    this.product.productList().subscribe((result)=>{
      console.warn(result);  
      this.productList = result;
    });
  }

  deleteProduct(id:string){
    console.log(id);
    this.product.productDelete(id).subscribe((result)=>{
      if (result){
        this.deleteMessage = "Product deleted Successfully!";
        this.productLists();
      }
    });
    setTimeout(()=>{
      this.deleteMessage = undefined
    }, 3000);
  }
}
