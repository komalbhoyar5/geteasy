import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, Pipe, PipeTransform } from '@angular/core';
import { ProductService } from '../../_services/index';
import { environment } from '../../../environments/environment';
declare var jQuery: any;

@Component({
  selector: 'app-local-market',
  templateUrl: './local-market.component.html',
  styleUrls: ['./local-market.component.css']
})

export class LocalMarketComponent implements OnInit {
  public apiLink= environment.API_URL;
    catLocalMarket : any;
    id: any;
    category: any;
    breadcrumb:any;
    subcategories:any;
    testResponse: any;
    company_address: any;
  	constructor(private http : HttpClient, 
  				private route : ActivatedRoute,
  				private router:Router, 
  				private productService: ProductService
  			) { 
        this.productService.castLocalMarket.subscribe(catLocalMarket=> this.catLocalMarket = catLocalMarket);
            console.log(this.catLocalMarket);
  	}

  ngOnInit() {
    this.route.params.subscribe(params => {
        this.id = params['id'] //log the value of id
        this.getLocalMarket(this.id);
        this.getCategoryDetails(this.id);
        this.getBreadcrumb(this.id);
        this.getsubCategoryDetails(this.id);
        this.getProjectDetails();
        this.company_address_details();
      });
  }
  getLocalMarket(id){
     this.productService.getLocalMarketList(id);
  }

  getCategoryDetails(id){
   return this.http.get(this.apiLink+'projectapis/getCategoryDetails/'+id+'.json')
      .subscribe(
      data => {
            this.category = data['response'];
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

  company_address_details(){
    return this.http.get(this.apiLink+'projectapis/company_address_details.json')
    .subscribe(
      data => {
            this.company_address = data['response'];
            console.log("I CANT SEE DATA HERE: ", this.company_address);
            return this.company_address;
          }
    )
  }

  getSlug(text){
    if (text) {
      return text.replace(/\W+/g, '-');
    }
  }
}
