import { Component, OnInit } from '@angular/core';
import { ProductService, UserService } from '../../_services/index';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NgModel } from '@angular/forms';
import { environment } from '../../../environments/environment';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
	public apiLink= environment.API_URL;
  currentUser : any ={};
  cart : any ={};
  carttotal: any;
  companycareno: any;
  prod: any;
  loading: any;
  product: any;
  allcartdata: any;
  constructor(
        private http : HttpClient,
        private productService: ProductService,
        private userService: UserService
        ) {
            // this.fetchCart();
            this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
            this.productService.castcart.subscribe(cart=> this.cart = cart);
            this.productService.castprod.subscribe(product=> this.product = product);
            this.productService.castcarttotal.subscribe(carttotal=> this.carttotal = carttotal);
            this.productService.castloading.subscribe(loading=> this.loading = loading);

         }

  ngOnInit() {
    this.getCompanyAddressDetails();
  }


  public addCount(countvalue){
    countvalue.Cart.product_count = parseInt(countvalue.Cart.product_count) + 1;
    this.productService.updateCartProductCount(countvalue.Cart);
  }

  public substractCount(countvalue){
    if (countvalue.Cart.product_count != 1) {
      countvalue.Cart.product_count = parseInt(countvalue.Cart.product_count) - 1;
      this.productService.updateCartProductCount(countvalue.Cart);
    }
  }

  public removeItem(cart){
    this.productService.removeCartItem(cart.Cart);
  }

  public getCompanyAddressDetails(){
    var i:number; 
      this.http.post(this.apiLink+'projectapis/company_address_details.json', {})
          .subscribe(
              data => {
                  if (data['status'] == "Success") {
                    this.companycareno = data['response']['customer_care_no']
                  }
              });
  }
  getSlug(text){
    if (text) {
      return text.replace(/\W+/g, '-');
    }
  }
}
