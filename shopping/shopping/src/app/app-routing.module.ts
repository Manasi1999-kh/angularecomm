import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { SingleProductComponent } from './single-product/single-product.component';
import { ShoppingCartComponent } from './myprofile/shopping-cart/shopping-cart.component';
import { MyprofileComponent } from './myprofile/myprofile.component';
import { ProfileInformationComponent } from './myprofile/profile-information/profile-information.component';
import { ManageAddressComponent } from './myprofile/manage-address/manage-address.component';
import {AuthService } from './services/auth-service';
import { SignupComponent } from './signup/signup.component';
import { ConactusComponent } from './conactus/conactus.component';
import { OrderComponent } from './myprofile/order/order.component';

const routes: Routes = [
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'product/:id',
    component: SingleProductComponent
  },
  {
    path:"contactus" , component: ConactusComponent
  },
  {
    path:"signup" , component:SignupComponent
  },
  
  {
    path: 'myprofile',
    component: MyprofileComponent,
    // canActivate: [AuthService],
    children: [
      {
        path: 'profile',
        component: ProfileInformationComponent,
        canActivate: [AuthService],
      },
      {
        path: 'shopping-cart',
        component: ShoppingCartComponent,
        canActivate: [AuthService],
      },
      {
        path: 'address',
        component: ManageAddressComponent
      }, 
    
      {
        path:"order" , component:OrderComponent 
      },  
    ]

  }
  // { path: '', redirectTo: 'home', pathMatch: 'full' },
  // { path: '*', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
