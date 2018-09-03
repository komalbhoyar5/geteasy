import { Component, OnInit,ViewChild  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProductService } from '../../_services/index';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { environment } from '../../../environments/environment';

import {StarRatingConfig} from "angular-star-rating/dist/src/star-rating-config";
import { SweetAlertService } from 'angular-sweetalert-service';
import {OwlCarousel} from 'ngx-owl-carousel';
declare var jQuery: any;

@Component({
  selector: 'app-service-details',
  templateUrl: './service-details.component.html',
  styleUrls: ['./service-details.component.css']
})
export class ServiceDetailsComponent implements OnInit {
  rating = 0;
  @ViewChild('owlElement') owlElement: OwlCarousel
  fun() {
     this.owlElement.next([200])
     //duration 200ms
   }
	private apiLink= environment.API_URL;
    products: any;
  	id: any;
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
	      this.getserviceProductDetails(this.id);
	    });
  		
    }
  ngAfterViewInit(){

  }
  getserviceProductDetails(id){
	 return this.http.get(this.apiLink+'projectapis/getServiceProductDetails/'+id+'.json')
	    .subscribe(
	    data => {
	          this.products = data['response'];
	          console.log("I CANT SEE product DATA HERE: ", data);
	          // this.category_id = this.products.response.product.Product.id;
	          return this.products;
	        }
	    )
	}
  onSubmit(){
  
  }
}
