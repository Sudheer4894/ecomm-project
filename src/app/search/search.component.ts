import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Product } from '../data-type';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  searchResult:undefined|Product[];
  constructor(private activatedRoute:ActivatedRoute, private product:ProductService){}

  ngOnInit(){
    let query = this.activatedRoute.snapshot.paramMap.get('query');
    console.log(query); 
    query && this.product.searchProduct(query).subscribe((result)=>{
      this.searchResult=result;

    });
  }
}
