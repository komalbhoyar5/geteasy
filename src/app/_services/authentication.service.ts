import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User } from '../_models/index';
import { SweetAlertService } from 'angular-sweetalert-service';
import { ProductService } from './product.service';
import { UserService } from './user.service';
import { Router, ActivatedRoute } from '@angular/router';
import 'rxjs/add/observable/of';
declare var jQuery: any;

@Injectable()
export class AuthenticationService {
    constructor(private http: HttpClient,
                private alertService : SweetAlertService,
                private router: Router,
                private productService: ProductService,
                private userService: UserService
        ) { 
        this.currentUser.next(JSON.parse(localStorage.getItem('currentUser')));
    }
    public apiLink = 'http://rnrsoft.in/testing/';
    // showlogin: any;
    localcart:any;
    // handle user
        private currentUser = new BehaviorSubject(false);
        castcurrentUser = this.currentUser.asObservable();

    // handle loading
        private loading = new BehaviorSubject(false);
        castloading = this.loading.asObservable();

    login(email: string, password: string) {
        this.loading.next(true);
        jQuery('#modal-content').on('shown.bs.modal', function() {
            jQuery("body.modal-open").removeAttr("style");
        });
        return this.http.post<any>(this.apiLink+'projectapis/customerLogin.json', { email: email, password: password })
            .subscribe(
              data => {
                if (data.status == 'Success') {
                    // Add user data to localstorage
                        localStorage.setItem('currentUser', JSON.stringify(data.response.User));
                        this.currentUser.next(JSON.parse(localStorage.getItem('currentUser')));
                    // get user address details if page is checkout
                        if (this.router.url == '/cart') {
                            this.userService.getUseraddressdetails();
                        }
                    // if local cart product is available then add them to db
                        this.localcart = JSON.parse(localStorage.getItem('local_cart'));
                        this.productService.addlocalproducttoCart(this.localcart);
                            this.alertService.success({
                                title: 'Account Login',
                                position: 'top-end',
                                toast: true,
                                // text: "You are successfully logged in.",
                                timer: 1500,
                                showConfirmButton: false,
                            });
                        this.loading.next(false);
                        jQuery("#myModal1").modal('toggle');
                        if (this.router.url == '/cart') {
                            this.router.navigate(['/checkout']);
                        };

                }else{
                    this.alertService.error({
                        title: 'Oops... error occurs',
                        text: data.message,
                    });
                    this.loading.next(false);
                }

            },
            error => {
                    this.alertService.error({
                        title: 'Oops... error occurs',
                        text: error.message,
                    });
                    this.loading.next(false);
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        sessionStorage.removeItem("currentUser");
        localStorage.removeItem("local_cart");
        localStorage.removeItem("selectedAddress");
        
        this.productService.calculateCartProductCounts();
        this.currentUser.next(JSON.parse(localStorage.getItem('currentUser')));
        this.router.navigate(['/']);
    }

    cartCount(id: number) {
        return this.http.post<any>(this.apiLink+'projectapis/fetchCartCount.json', { id: id })
            .map(count => {
                JSON.stringify(count);
                return count;
            });
    }
    cart(id: number) {
        return this.http.post<any>(this.apiLink+'projectapis/fetchCart.json', { id: id })
            .map(cart => {
                JSON.stringify(cart);
                return cart;
            });
    }

    isLoggedIn(): Boolean {
        const currentUser = localStorage.getItem("currentUser");
        if (currentUser) {
          return true;
        }
        return false;
    }
    getLoggedInUser(){
        const currentUser = localStorage.getItem("currentUser");
        if (!currentUser) {
          return null;
        }
        return currentUser;
    }
}