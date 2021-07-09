import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/product.service';
import { Route } from '@angular/compiler/src/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.scss']
})
export class SingleProductComponent implements OnInit {
  simillarProducts = [];
  product: any;
  constructor(private productService: ProductService, private route: ActivatedRoute) {
    /*
    
    this.simillarProducts = this.productService.getSingleProducts();
    this.productService.getSingleProducts(Number(this.route.snapshot.params.id)).subscribe(res => {
      this.product = res;
      
      
    });
    */
    
  }

  ngOnInit() {

  }
/*
  
  foods = [
    { value: 'steak-0', viewValue: 'Small' },
    { value: 'pizza-1', viewValue: 'Medium' },
    { value: 'tacos-2', viewValue: 'Large' }
  ];

*/
}
