import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { ProductService } from '../_services/index';
import { environment } from '../../environments/environment';
import { TruncateModule } from 'ng2-truncate';
declare var jQuery: any;
@Pipe({
 name: 'truncate'
})
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {
  	catproduct : any;
	  testResponse: any;
    subcategories: any;
    category: any;
    products: any;
    breadcrumb: any;
  	id: any;
	private apiLink= environment.API_URL;

  	constructor(	private http : HttpClient, 
  				private route : ActivatedRoute,
  				private router:Router, 
  				private productService: ProductService
  			) { 
            this.productService.castproduct.subscribe(catproduct=> this.catproduct = catproduct);
  	}

  	ngOnInit() {
	  	this.route.params.subscribe(params => {
	      this.id = params['id'] //log the value of id
	      this.getsubCategoryDetails(this.id);
	      this.getCategoryDetails(this.id);
	      this.getProducts(this.id);
	      this.getBreadcrumb(this.id);
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

  getsubCategoryDetails(id){
     return this.http.get(this.apiLink+'projectapis/getsubCategoryDetails/'+id+'.json')
        .subscribe(
        data => {
              this.subcategories = data;
              console.log("I CANT SEE subcategory DATA HERE: ", this.subcategories);
              return this.subcategories;
            }
        )
  }

  getProducts(id){
     this.productService.getCategoryProductList(id);
  }
  getCategoryDetails(id){
   return this.http.get(this.apiLink+'projectapis/getCategoryDetails/'+id+'.json')
      .subscribe(
      data => {
            this.category = data;
            console.log("I CANT SEE category details HERE: ", this.category);
            return this.category;
          }
      )
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

}
