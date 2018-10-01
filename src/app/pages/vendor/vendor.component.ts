import { Component, OnInit,ViewChild  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { ProductService } from '../../_services/index';
import { environment } from '../../../environments/environment';
import { DatePipe } from '@angular/common';
import {StarRatingConfig} from "angular-star-rating/dist/src/star-rating-config";
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {OwlCarousel} from 'ngx-owl-carousel';
declare var jQuery: any;

@Component({
  selector: 'app-vendor',
  templateUrl: './vendor.component.html',
  styleUrls: ['./vendor.component.css']
})
export class VendorComponent implements OnInit {
  @ViewChild('owlElement') owlElement: OwlCarousel
  	public apiLink= environment.API_URL;
	id:any;
	vendor: any;
	today: any;
	current_time: any;
	day:any;
	timeinhr:any;
	timeinmin:any;
	hr:any
	company_address:any;
	testResponse:any;
	rating = 0;
	user_id: any;
	localm_id: any;
	breadcrumb:any;
	localProduct: any;
	catVend: any;
	form = new FormGroup({
	    ratingInput: new FormControl('')
	});
	fun() {
     this.owlElement.next([200])
     //duration 200ms
   	}
  	constructor(private http : HttpClient, 
  				private route : ActivatedRoute,
  				private router:Router, 
  				private productService: ProductService,
  				private datePipe: DatePipe
  				) { 
        this.productService.catlocalm.subscribe(localProduct=> this.localProduct = localProduct);
        // console.log(this.localProduct);
  	}

	ngOnInit() {
		this.today = this.datePipe.transform(new Date(), 'EEEE').toString();
		this.current_time = this.datePipe.transform(new Date(), 'hh:mm a');

		this.route.params.subscribe(params => {
			// console.log(params);
	    this.user_id = params['user_id']; //log the value of id
	    this.localm_id = params['localm_id']; //log the value of id
	    this.getVendorDetails(this.user_id);
	    this.company_address_details();
	    this.getProjectDetails();
	    this.getBreadcrumb(this.localm_id);
	    this.getProducts(this.user_id, this.localm_id);
	    this.getOtherCategoriesByUser(this.user_id);
	    this.fun();
      });

		// this.owlElement.owlCarousel();
	}

	getVendorDetails(id){
	return this.http.get(this.apiLink+'projectapis/getVendorDetails/'+id+'.json')
	  .subscribe(
	  data => {
	        this.vendor = data['response'];
	        console.log("I CANT SEE vendor details HERE: ", this.vendor);
	        return this.vendor;
	      }
	  )
	}
	
	convert_to_min(time){
		this.hr = 60;
		 var time = time.split(' ');
		 if(time[1] == 'PM'){
		 	this.day = 12;
		 }else{
		 	this.day = 0;
		 }
		 this.timeinhr = time[0].split(':');
		 this.timeinmin = parseInt(this.timeinhr[0])+parseInt(this.day)+(parseInt(this.timeinhr[1])/ parseInt(this.hr));
		 return this.timeinmin;
	}
	onSubmit(){
	
	}
	company_address_details(){
	    return this.http.get(this.apiLink+'projectapis/company_address_details.json')
	    .subscribe(
	      data => {
	            this.company_address = data['response'];
	            // console.log("I CANT SEE DATA HERE: ", this.company_address);
	            return this.company_address;
	          }
	    )
	}
	getProjectDetails(){
	    return this.http.get(this.apiLink+'projectapis/getProjectDetails.json')
	    .subscribe(
	      data => {
	            this.testResponse = data['response'];
	            // console.log("I CANT SEE DATA HERE: ", this.testResponse);
	            return this.testResponse;
	          }
	    )
  	}

  	getBreadcrumb(localm_id){
	   return this.http.get(this.apiLink+'projectapis/breadcrumb/'+localm_id+'.json')
	      .subscribe(
	      data => {
	            this.breadcrumb = data;
	            // console.log("I CANT SEE breadcrumb details HERE: ", this.breadcrumb);
	            return this.breadcrumb;
	          }
	      )
  	}
  	getProducts(user_id, localm_id){
	    this.productService.getLocalProductList(user_id, localm_id);
	}

	getOtherCategoriesByUser(user_id){
		return this.http.get(this.apiLink+'projectapis/getOtherCategoriesByUser/'+user_id+'.json')
		  .subscribe(
		  data => {
		        this.catVend = data['response'];
		        // console.log("I CANT SEE getOtherCategoriesByUser HERE: ", this.catVend);
		        return this.catVend;
		      }
		  )
	}

	getSlug(text){
      if (text) {
        return text.replace(/\W+/g, '-');
      }
    }
}
