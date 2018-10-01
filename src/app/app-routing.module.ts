import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {StarRatingModule} from 'angular-star-rating';


import { HomeComponent } from './pages/home/home.component';
import { CategoryComponent } from './category/category.component';
import { ProductsComponent } from './products/products.component';
import { AccountComponent } from './customer/account/account.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'product/:id/:cat_id/:product_name', component: ProductsComponent },
  { path: 'category/:id/:cat_name', component: CategoryComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, {useHash: true}),
    FormsModule,
    ReactiveFormsModule,
    StarRatingModule.forRoot()
  ],
  exports: [ RouterModule ],

  declarations: [
    	CategoryComponent,
    	ProductsComponent,
  		HomeComponent,
      AccountComponent,
  ]
})
export class AppRoutingModule { }
