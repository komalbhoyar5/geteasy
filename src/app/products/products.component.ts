import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProductService } from '../_services/index';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { environment } from '../../environments/environment';

import { NgxCarousel } from 'ngx-carousel';
import {StarRatingConfig} from "angular-star-rating/dist/src/star-rating-config";
import { SweetAlertService } from 'angular-sweetalert-service';
declare var jQuery: any;

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
	public apiLink= environment.API_URL;
	public carouselTileItems: Array<any>;
 	public carouselTile: NgxCarousel;
 	breadcrumb: any;
    products: any;
  	id: any;
  	cat_id:any;
  	category_id: any;
	rating = 0;
  	cart: any = {};
  	wishlist: any = {};
    currentUser : any ={};
    testResponse: any;
    category: any;
    currency: any;
    vendor_detail:any;
    productinwishlist:any;
  	form = new FormGroup({
	    ratingInput: new FormControl('')
	});

  	constructor(private http : HttpClient, 
  				private route : ActivatedRoute,
    			private fb: FormBuilder,
  				private router:Router,
        		private productService: ProductService,
        		private alertService: SweetAlertService

  				) { 
            this.productService.castproductinwishlist.subscribe(productinwishlist=> this.productinwishlist = productinwishlist);
  	}

	ngOnInit() {
		this.route.params.subscribe(params => {
	      this.id = params['id'] //log the value of id
	      this.cat_id = params['cat_id'] //log the value of id
	      this.getProductDetails(this.id);
	      this.getBreadcrumb(this.cat_id);
	    });
		this.checkProductInWishlist(this.id);
	}
	ngAfterViewChecked(): void {
	    /* Zoom image */
        // if(jQuery('#product-zoom').length >0){
	            jQuery('#product-zoom').elevateZoom({
	                zoomType: "inner",
	                cursor: "crosshair",
	                zoomWindowFadeIn: 500,
	                zoomWindowFadeOut: 750,
	                gallery:'gallery_01'
	            }); 
	        // }
	}

	getBreadcrumb(id){
	   	return this.http.get(this.apiLink+'projectapis/breadcrumb/'+id+'.json')
	      .subscribe(
	      data => {
	            this.breadcrumb = data['response'];
	            console.log("I CANT SEE breadcrumb de/tails HERE: ", this.breadcrumb);
	            return this.breadcrumb;
	          }
	    )
	}

	getProductDetails(id){
	 return this.http.get(this.apiLink+'projectapis/product_details/'+id+'.json')
	    .subscribe(
	    data => {
	        this.products = data['response']['product']['Product'];
	        this.vendor_detail = data['response']['product']['User']['VendorDetails'];
	        // console.log("I CANT SEE product DATA HERE: ",  this.vendor_detail);
	        return this.products;
	        }
	    )
	}
	onSubmit(){
	
	}

	getSlug(text){
	    if (text) {
	      return text.replace(/\W+/g, '-');
	    }
	}

	countvalue:number  = 1;
	addToCart() {
		this.cart.product_id = this.id;
		this.cart.product_count = this.countvalue;
		this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (this.currentUser) {
			this.cart.user_id = this.currentUser.id;
		}
	    this.productService.addToCart(this.cart);
	}


	public addCount(){
		this.countvalue = this.countvalue +1;
	}

	public substractCount(){
		if (this.countvalue != 0) {
			this.countvalue = this.countvalue - 1;
		}
	}

	public addToWishList(wishid =""){
		this.wishlist.id = wishid;
		this.wishlist.product_id = this.id;
		this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
		if (this.currentUser) {
			this.wishlist.user_id = this.currentUser.id;
		}
		console.log(this.wishlist);
	    this.productService.addToWishlist(this.wishlist);
	}
	
	public checkProductInWishlist(id){
		this.wishlist.product_id = id;
		this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
		if (this.currentUser) {
			this.wishlist.user_id = this.currentUser.id;
		}
		console.log("-----------");
		console.log(this.wishlist);
	    return this.http.post(this.apiLink+'projectapis/checkProductInWishlist.json', this.wishlist)
	    .subscribe(
	    data => {
	        this.productinwishlist = data['response'];
	        console.log("I CANT SEE wish DATA HERE: ",  this.productinwishlist);
	        return this.productinwishlist;
	        }
	    )
	}
}
