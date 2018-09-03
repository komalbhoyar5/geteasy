import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { ProductService } from '../../_services/index';
import { environment } from '../../../environments/environment';
import { TruncateModule } from 'ng2-truncate';
declare var jQuery: any;


@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {
	catServices : any;
	testResponse: any;
    subcategories: any;
    servicedetails: any;
    products: any;
    breadcrumb: any;
  	id: any;
	private apiLink= environment.API_URL;

  	constructor(private http : HttpClient, 
  				private route : ActivatedRoute,
  				private router:Router, 
  				private productService: ProductService) {
            		this.productService.castservices.subscribe(catServices=> this.catServices = catServices);
  				}

    	ngOnInit() {
  	  	this.route.params.subscribe(params => {
  	      this.id = params['id'] //log the value of id
  	      // this.getsubCategoryDetails(this.id);
  	      this.getServiceDetails(this.id);
  	      this.getService(this.id);
  	      // this.getBreadcrumb(this.id);
  	    });

  		  jQuery(".owl-carousel").each(function(index, el) {
          var config = jQuery(this).data();
          config.navText = ['<i class="fa fa-angle-left"></i>','<i class="fa fa-angle-right"></i>'];
          config.smartSpeed="300";
          if(jQuery(this).hasClass('owl-style2')){
            config.animateOut="fadeOut";
            config.animateIn="fadeIn";    
          }
          jQuery(this).owlCarousel(config);
        });

      /// tre menu category
        jQuery(document).on('click','.tree-menu li span',function(){
            jQuery(this).closest('li').children('ul').slideToggle();
            if(jQuery(this).closest('li').haschildren('ul')){
                jQuery(this).toggleClass('open');
            }
            return false;
        });
      // View grid list product 
        jQuery(document).on('click','.display-product-option .view-as-grid',function(){
            jQuery(this).closest('.display-product-option').find('li').removeClass('selected');
            jQuery(this).addClass('selected');
            jQuery(this).closest('#view-product-list').find('.product-list').removeClass('list').addClass('grid');
            return false;
        });
      // View list list product 
        jQuery(document).on('click','.display-product-option .view-as-list',function(){
            jQuery(this).closest('.display-product-option').find('li').removeClass('selected');
            jQuery(this).addClass('selected');
            jQuery(this).closest('#view-product-list').find('.product-list').removeClass('grid').addClass('list');
            return false;
        });
      // CATEGORY FILTER 
        jQuery('.slider-range-price').each(function(){
            var min             = jQuery(this).data('min');
            var max             = jQuery(this).data('max');
            var unit            = jQuery(this).data('unit');
            var value_min       = jQuery(this).data('value-min');
            var value_max       = jQuery(this).data('value-max');
            var label_reasult   = jQuery(this).data('label-reasult');
            var t               = jQuery(this);
            jQuery( this ).slider({
              range: true,
              min: min,
              max: max,
              values: [ value_min, value_max ],
              slide: function( event, ui ) {
                var result = label_reasult +" "+ unit + ui.values[ 0 ] +' - '+ unit +ui.values[ 1 ];
                console.log(t);
                t.closest('.slider-range').find('.amount-range-price').html(result);
              }
            });
        })
  	}

	getService(id){
	 	this.productService.getCategoryServiceList(id);
	}

	getServiceDetails(id){
		return this.http.get(this.apiLink+'projectapis/getServiceDetails/'+id+'.json')
		  .subscribe(
		  data => {
	        this.servicedetails = data['response'];
	        console.log("I CANT SEE servicedetails details HERE: ", this.servicedetails);
	        return this.servicedetails;
	      }
	  	)
	}


}
