import { Component, OnInit, NgModule } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router, ActivatedRoute,NavigationEnd } from '@angular/router';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';
import { UserService, AuthenticationService, ProductService } from '../../_services/index';
import { SweetAlertService } from 'angular-sweetalert-service';
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
    model: any = {};
    loginData:any = {};
    loading = false;
    showNav = false;
    email_error:any;
    password_error:any;
    currentUser:any;
    cartCount: any;
    cart: any;
    carttotal:any;
    wishlistcount: any;
  	constructor(
        private route: ActivatedRoute,
        private router: Router,
        private userService: UserService,
        private fb: FormBuilder,
        private http : HttpClient,
        private alertService: SweetAlertService,
        private productService: ProductService,
        private authenticationService: AuthenticationService
  		) { 
      this.productService.castcart.subscribe(cart=> this.cart = cart);
      this.productService.castcarttotal.subscribe(carttotal=> this.carttotal = carttotal);
      this.productService.castwishlistcount.subscribe(wishlistcount=> this.wishlistcount = wishlistcount);
      this.authenticationService.castcurrentUser.subscribe(currentUser=> this.currentUser = currentUser);
      this.authenticationService.castloading.subscribe(loading=> this.loading = loading);
      this.productService.cast.subscribe(cartCount=> this.cartCount = cartCount);
    }

	ngOnInit() {
    	this.getProjectDetails();
    	this.getCategoryDetails();
      this.getServiceCategoryDetails();

      // menu related jqueries
      this.router.events.subscribe((evt) => {
          if (!(evt instanceof NavigationEnd)) {
              return;
          }
          window.scrollTo(0, 0)
      });
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

    getSlug(text){
      if (text) {
        return text.replace(/\W+/g, '-');
      }
    }

    login() {
      console.log('i am here');
      console.log(this.loginData.email);
      this.authenticationService.login(this.loginData.email, this.loginData.password);
      jQuery('.option2').attr('style', 'padding-right: 0px !important;');
            
    }
    logout(){
        this.authenticationService.logout();
    }

    register() {
        this.loading = true;
        this.userService.create(this.model)
            .subscribe(
                data => {
                    if (data['status'] == "Success") {
                        
                        this.alertService.success({
                            title: 'Account created',
                            position: 'top-end',
                            toast: true,
                            text: "Your account registered successfully. Please check your mail to verify your account.",
                            timer: 1500,
                            showConfirmButton: false,
                        });
                        this.loading = false;
                        jQuery("#myModal2").modal('toggle');
                        if (this.router.url == '/cart') {
                            this.router.navigate(['/checkout']);
                        };
                    }else{
                        if (data['message']['email']) {
                            this.email_error = data['message']['email'];
                        }
                        if(data['message']['password']){
                            this.password_error = data['message']['password'];
                        }

                        this.alertService.error({
                            title: 'Oops... error occurs',
                            text: "Unable to create account, please check information you have entered is correct.",
                        });
                        this.loading = false;
                    }
                },
                error => {
                    this.alertService.error({
                        title: 'Oops... error occurs',
                        text: error.message,
                    });
                    this.loading = false;
                });
    }
  public removeItem(cart){
    this.productService.removeCartItem(cart.Cart);
  }
}
