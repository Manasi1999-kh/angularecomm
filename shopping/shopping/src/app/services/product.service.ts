import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { timeout, delay } from 'q';
import { Observable, of } from 'rxjs';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private loadingService: LoadingService , private http:HttpClient) { }
  getProducts(){
    return this.http.get<any>('http://localhost:5000/api/products')
  }
  getSingleProducts(id:any){
    return this.http.get<any>(`http://localhost:5000/api/products/${id}`)
  }
  getCartNumber(){
    let cartNumber:any = localStorage.getItem('cartNumber')
    cartNumber = JSON.parse(cartNumber);
    return cartNumber;
  }

  cartNumber(){
    let cartNumber:any = localStorage.getItem('cartNumber');
    cartNumber = JSON.parse(cartNumber)
    if(cartNumber){
      localStorage.setItem('cartNumber' , cartNumber + 1 );
    }else{
      localStorage.setItem('cartNumber' , JSON.stringify(1))
    }
  }

  totalCost(product:any){
    let totalCost:any = localStorage.getItem('totalCost'); //120
    if(totalCost != null){
      totalCost = parseInt(totalCost)
      localStorage.setItem('totalCost' , totalCost + product.price)
    }else{
      localStorage.setItem('totalCost' , product.price); //120
    }
  }

  addtoCart(product:any){
    let cartItem:any = localStorage.getItem('products');
    cartItem = JSON.parse(cartItem)
    if(cartItem !== null){
      // {id:2 , name:"k" , cart:1,}
      if(cartItem[product.id] === undefined){
        cartItem = {
          ...cartItem, // 1:{id:1 , name:"k" , cart:1,}
          [product.id]:product   //2:{id:2 , name:"k" , cart:1,}
        }
      }
      cartItem[product.id].cart += 1 //mark*********************
    }else{
      product.cart = 1;
      // {id:1 , name:"k" , cart:1,}
      cartItem = {
        [product.id]:product // {id:1 , name:"k" , cart:1,}
        // 1:{id:1 , name:"k" , cart:1,}
      }
    }
    localStorage.setItem('products' , JSON.stringify(cartItem))
    this.cartNumber()
    this.totalCost(product)
  }

  setItem(id:any){
    console.log(id)
    this.getSingleProducts(id).subscribe((res)=>{
      console.log(res[0]);
      this.addtoCart(res[0])
      // localStorage.setItem('products' , JSON.stringify(res))
    })
    // console.log(item);
  }
  public cartProducts:any;
  getCartFromLocal(){
    let cart:any = localStorage.getItem('products')
    cart = JSON.parse(cart)
    this.cartProducts = Object.values(cart);
  }


  increment(id:any){
    console.log(id);
    let products:any = localStorage.getItem('products');
    let totalCost:any = localStorage.getItem('totalCost');
    let cartNumber:any = localStorage.getItem('cartNumber');
    products = JSON.parse(products);
    totalCost = JSON.parse(totalCost);
    cartNumber = JSON.parse(cartNumber);
    console.log(Object.values(products));
    let inCart = Object.values<any>(products).find((elem:any)=>elem.id === id).cart;
    let inPrice = Object.values<any>(products).find((elem:any)=>elem.id ===id).price;
    totalCost+=inPrice;
    cartNumber+=1;
    inCart+=1;
    if(inCart<=5){
      Object.values<any>(products).find((item)=>item.id === id).cart = inCart;
      localStorage.setItem('products' , JSON.stringify(products));
      localStorage.setItem('totalCost' , JSON.stringify(totalCost));
      localStorage.setItem('cartNumber' , JSON.stringify(cartNumber));
      this.getCartFromLocal()
    }
  }

  decrement(id:any){
    console.log(id);
    let products:any = localStorage.getItem('products');
    let totalCost:any = localStorage.getItem('totalCost');
    let cartNumber:any = localStorage.getItem('cartNumber');
    products = JSON.parse(products);
    totalCost = JSON.parse(totalCost);
    cartNumber = JSON.parse(cartNumber);
    console.log(Object.values(products));
    let inCart = Object.values<any>(products).find((elem:any)=>elem.id === id).cart;
    let inPrice = Object.values<any>(products).find((elem:any)=>elem.id ===id).price;
    totalCost-=inPrice;
    cartNumber-=1;
    inCart-=1;
    if(inCart>=1){
      Object.values<any>(products).find((item)=>item.id === id).cart = inCart;
      localStorage.setItem('products' , JSON.stringify(products));
      localStorage.setItem('totalCost' , JSON.stringify(totalCost));
      localStorage.setItem('cartNumber' , JSON.stringify(cartNumber));
      this.getCartFromLocal()
    }
  }

  totalPrice(){
    let price:any = localStorage.getItem('totalCost')
    price=JSON.parse(price);
    return price;
  }


  removeItem(id:any){
    let products:any = localStorage.getItem('products');
    products = JSON.parse(products)
    let totalCost:any = localStorage.getItem('totalCost');
    totalCost = JSON.parse(totalCost);
    let cartNumber:any = localStorage.getItem('cartNumber');
    cartNumber = JSON.parse(cartNumber)

    let dcrsPrice = Object.values<any>(products).find((item:any)=>item.id === id).price;
    console.log(dcrsPrice);
    let dcrsCart = Object.values<any>(products).find((item:any)=>item.id === id).cart;
    console.log(dcrsCart);
    if(cartNumber == 1){
      totalCost -= dcrsPrice;
      cartNumber -= 1;
    }else{
      totalCost -= dcrsPrice * dcrsCart;
      cartNumber -= dcrsCart;
    }

    if(cartNumber == 0){
      localStorage.removeItem('cartNumber');
      localStorage.removeItem('totalCost');
      localStorage.removeItem('products');
      return;
    }
    let cartKey = Object.keys(products).filter((item:any) => item != id);
    console.log(cartKey);
    
    let cartValue = Object.values<any>(products).filter((item:any)=>item.id != id)
    console.log(cartValue);
    let newCart:any;
    cartKey.forEach((key:any)=>{
      cartValue.forEach((item:any)=>{
        if(item.id == key){
          newCart = {
            ...newCart,
            [key]:item
          }
        }
      })
    })

    localStorage.setItem('products' , JSON.stringify(newCart));
    localStorage.setItem('totalCost' , JSON.stringify(totalCost));
    localStorage.setItem('cartNumber' , JSON.stringify(cartNumber))
    this.getCartFromLocal();
    
  }


  postAddress(address:any){
    let user_id = localStorage.getItem('user_id');
    return this.http.post(`http://localhost:5000/api/address/${user_id}` , address);
  }

  products(){
    let user_id = localStorage.getItem('user_id');
    let address_id = localStorage.getItem('address_id');
    let products:any =  localStorage.getItem('products');
    let cartNumber:any = localStorage.getItem('cartNumber');
    let totalCost:any = localStorage.getItem('totalCost');

    products = JSON.parse(products);
    products = Object.values(products)
    cartNumber = JSON.parse(cartNumber);
    totalCost = JSON.parse(totalCost);

    let productsData:any = {
      user_id:user_id,
      address_id:address_id,
      products:products,
      totalPrice:totalCost,
      totalQuantity:cartNumber
    } 

    return this.http.post(`http://localhost:5000/api/orderProducts`, productsData);
  }
  public orderedProducts:any;
  getOrderedProducts(){
    let user_id = localStorage.getItem('user_id');
    this.http.get<any>(`http://localhost:5000/api/orderedProducts/${user_id}`).subscribe((res)=>{
      console.log(res);
      this.orderedProducts = res
    } , (err)=>{
      console.log(err);
    })
  }

}