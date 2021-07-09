import { Component, OnInit } from '@angular/core';
import {MatIconRegistry} from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ProductService } from '../services/product.service';


@Component({
  selector: 'app-home',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  carouselOptions = 
  {
    items: 1, 
    dots: false, 
    navigation: false, 
    loop:true,
    margin:10,
    autoplay:true,
    animateOut: 'fadeOut',
    autoHeight: true,
    autoHeightClass: 'owl-height',
    
}
images = [];
public products = []
  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer, private router: Router, 
    public productService: ProductService) {
    
    this.productService.getProducts().subscribe((res)=>{
      // console.log(res.products);
      console.log(res);
      this.products = res.products
      console.log(this.products);
      
    })
  }

  ngOnInit() {
  }

  

}
