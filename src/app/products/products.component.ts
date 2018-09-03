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
  	category_id: any;
	rating = 0;
  	cart: any = {};
    currentUser : any ={};
    testResponse: any;
    category: any;
    currency: any;
  	form = new FormGroup({
	    ratingInput: new FormControl('')
	});

  	constructor(private http : HttpClient, 
  				private route : ActivatedRoute,
    			private fb: FormBuilder,
  				private router:Router,
        		private productService: ProductService,
        		private alertService: SweetAlertService

  				) { }

	ngOnInit() {
		this.route.params.subscribe(params => {
	      this.id = params['id'] //log the value of id
	      this.getProductDetails(this.id);
	      this.getBreadcrumb(this.category_id);
	    });

	}
	ngAfterViewInit() {
	    /* Zoom image */
        // if(jQuery('#product-zoom').length >0){
            jQuery('#product-zoom').elevateZoom({
                zoomType: "inner",
                cursor: "crosshair",
                zoomWindowFadeIn: 500,
                zoomWindowFadeOut: 750,
                gallery:'gallery_01'
            }); 
        }
	// }

	getBreadcrumb(id){
	   	return this.http.get(this.apiLink+'projectapis/breadcrumb/'+id+'.json')
	      .subscribe(
	      data => {
	            this.breadcrumb = data;
	            console.log("I CANT SEE breadcrumb details HERE: ", this.breadcrumb);
	            return this.breadcrumb;
	          }
	    )
	}

	getProductDetails(id){
	 return this.http.get(this.apiLink+'projectapis/product_details/'+id+'.json')
	    .subscribe(
	    data => {
	          this.products = data['response']['product']['Product'];
	          // console.log("I CANT SEE product DATA HERE: ", this.products.response.product.Product);
	          this.category_id = this.products.response.product.Product.id;
	          return this.products;
	        }
	    )
	}
	onSubmit(){
	
	}
}
