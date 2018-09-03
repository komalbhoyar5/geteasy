import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
declare var jQuery: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
	public apiLink= environment.API_URL;
  	testResponse: any;
  	categories: any;
    serviceCategories: any;

  	constructor(
        private route: ActivatedRoute,
        private router: Router,
        private fb: FormBuilder,
        private http : HttpClient,
  		) { }

	ngOnInit() {
    	this.getProjectDetails();
    	this.getCategoryDetails();
      this.getServiceCategoryDetails();

      // menu related jqueries

	}
  ngAfterViewInit(){
      

    }

    getProjectDetails(){
  	 	return this.http.get(this.apiLink+'projectapis/getProjectDetails.json')
			.subscribe(
				data => {
		          this.testResponse = data;
		          // console.log("I CANT SEE DATA HERE: ", this.testResponse);
		          return this.testResponse;
		        }
			)
  	}

  	getCategoryDetails(){
	    return this.http.get(this.apiLink+'projectapis/getCategories.json')
	        .subscribe(
	        data => {
              this.categories = data;
              // console.log("I CANT SEE category DATA HERE: ", this.categories);
              return this.categories;
            }
        )
  	}
    getServiceCategoryDetails(){
      return this.http.get(this.apiLink+'projectapis/getServiceCategory.json')
          .subscribe(
          data => {
              this.serviceCategories = data;
              // console.log("I CANT SEE service category DATA HERE: ", this.serviceCategories);
              return this.serviceCategories;
            }
        )
    }
}
