import { Component, OnInit,ViewChild  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ProductService } from '../../_services/index';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { environment } from '../../../environments/environment';
import { DatePipe } from '@angular/common';

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
  today: any;
  current_time:any;
  rating = 0;
  @ViewChild('owlElement') owlElement: OwlCarousel
  fun() {
     this.owlElement.next([200])
     //duration 200ms
   }
	private apiLink= environment.API_URL;
    products: any;
  	id: any;
    service_cat:any;
    breadcrumb: any;
    hr: any;
    day:any;
    timeinhr:any;
    timeinmin:any;
  	form = new FormGroup({
	    ratingInput: new FormControl('')
	});
  	constructor(private http : HttpClient, 
  				private route : ActivatedRoute,
    			private fb: FormBuilder,
  				private router:Router,
      		private productService: ProductService,
      		private alertService: SweetAlertService,
          private datePipe: DatePipe
        	) { }

  	ngOnInit() {
      this.today = this.datePipe.transform(new Date(), 'EEEE').toString();
      this.current_time = this.datePipe.transform(new Date(), 'hh:mm a');

  		this.route.params.subscribe(params => {
	      this.id = params['id'] //log the value of id
        this.service_cat = params['service_cat']; //log the value of service_cat
	      this.getserviceProductDetails(this.id);
        this.getBreadcrumb(this.service_cat);
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
}
