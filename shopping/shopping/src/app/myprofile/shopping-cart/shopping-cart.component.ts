import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.scss']
})
export class ShoppingCartComponent implements OnInit {


  constructor(public productService:ProductService) {
    this.productService.getCartFromLocal()
    // this.productService.getCartNumber();
   }

  ngOnInit() {
    this.productService.getCartNumber()
  }

}


