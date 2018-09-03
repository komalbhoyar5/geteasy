import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { Cart, Product} from '../_models/index';
// import { AuthenticationService } from './authentication.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/of';
import { SweetAlertService } from 'angular-sweetalert-service';
import { environment } from '../../environments/environment';

@Injectable()
export class ProductService {
  currentUser : any ={};
  total : number = 0;
  localcart : any = {};
  makelocalcart : any = {};
  private apiLink= environment.API_URL;
  // cart array
    private product = new BehaviorSubject(0);
    castprod = this.product.asObservable();
  // cart count in header section
    private cartCount = new BehaviorSubject(0);
    cast = this.cartCount.asObservable();
  // grand total on cart page
    private carttotal= new BehaviorSubject(0);
    castcarttotal = this.carttotal.asObservable();

  // handle loading
    private loading = new BehaviorSubject(false);
    castloading = this.loading.asObservable();

  // allcartdata
    private cart = new BehaviorSubject([]);
    castcart = this.cart.asObservable();

  // categorty wise product
    private catProduct = new BehaviorSubject([]);
    castproduct = this.catProduct.asObservable();

  // categorty wise product
    private catServices = new BehaviorSubject([]);
     castservices = this.catServices.asObservable();


  // categorty wise product
    private catLocalMarket = new BehaviorSubject([]);
    castLocalMarket = this.catLocalMarket.asObservable();

    constructor(private http: HttpClient,
                // private authenticationService: AuthenticationService,
                private alertService: SweetAlertService
        ) { 
        this.calculateCartProductCounts();
        this.getcart();
    }
    count:string;
    
    id: number;
  // ================================= cart services ======================================//
    // get all cart data
      getcart(): Observable<Cart[]>{
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (this.currentUser) {
          return this.http.post<Cart[]>(this.apiLink+'projectapis/fetchCart.json', { id: this.currentUser.id })
          .map(cartdata => {
              JSON.stringify(cartdata);
              this.cart.next(cartdata['response']);
              return cartdata['response'];
          });
        }else{
          this.localcart = JSON.parse(localStorage.getItem('local_cart'));
          if (this.localcart != null) {
            if (this.localcart.length > 0) {
              JSON.stringify(this.localcart);
              this.cart.next(this.localcart);
              return Observable.of(this.localcart);
            }else{
              this.localcart = [];
              this.cart.next(this.localcart);
              return Observable.of(this.localcart);
            }
          }else{
            this.localcart = [];
            this.cart.next(this.localcart);
            return Observable.of(this.localcart);
          }
        }
      }

    // get and update cart count
      calculateCartProductCounts(){
          const x = this.getcart()
                      .subscribe(data => {
                        this.cartCount.next(data.length);
                        this.cartgrandtotal(data);
                      });
      }
    
    // add product in cart
      addToCart(product: Cart): void {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (this.currentUser) {
            this.http.post(this.apiLink+'projectapis/addToCart.json', product)
            .subscribe(
              data => {
                this.calculateCartProductCounts();
                this.alertService.success({
                    toast: true,
                    title: 'Product has been added to cart',
                    // text: "Your product has been added to cart",
                    timer: 1500,
                    showConfirmButton: false,
                    position: 'top-end',
                    margin: '11em 0em'
                });
              },
              error => {
                this.alertService.error({
                    title: 'Oops... error occurs',
                    text: error.message,
                })
              });
          
        }
        else{
          // localStorage.removeItem('local_cart');
          let local: Cart[];
          let count = 0;
          local = JSON.parse(localStorage.getItem("local_cart")) || [];
          // if product already available in cart
            if (local.length > 0) {
              for (let element of local) {
                if(element['Cart']['product_id'] == product.product_id){
                  element['Cart']['product_count'] = element['Cart']['product_count'] + product.product_count;
                  count += 1; 
                }
              }
              localStorage.setItem("local_cart", JSON.stringify(local));
              this.calculateCartProductCounts();

            }
            if (local.length == 0 || count == 0){
              this.getProductDetail(product)
              .subscribe(
                  data => {
                        JSON.stringify(data);
                        this.makelocalcart['Cart'] = product;
                        this.makelocalcart['Product'] = data['response']['product']['Product'];
                        local.push(this.makelocalcart);
                        localStorage.setItem("local_cart", JSON.stringify(local));
                        this.calculateCartProductCounts();
                      }
                  );
            }
            this.alertService.success({
                toast: true,
                title: 'Product has been added to cart',
                // text: "Your product has been added to cart",
                timer: 1500,
                showConfirmButton: false,
                position: 'top-end',
                margin: '11em 0em'
            });
        }
      }

    // cart - increase product count
      updateCartProductCount(product: Cart){
          this.loading.next(true);
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (this.currentUser) {
          this.http.post(this.apiLink+'projectapis/updateCartProduct.json', product)
              .subscribe(
                data => {
                  this.calculateCartProductCounts();
                });
        }else{
          this.localcart = JSON.parse(localStorage.getItem('local_cart'));
          if (this.localcart.length > 0) {
            for (let element of this.localcart) {
              if(element['Cart']['product_id'] == product.product_id){
                element['Cart']['product_count'] = product.product_count;
              }
            }
            localStorage.setItem("local_cart", JSON.stringify(this.localcart));
            this.calculateCartProductCounts();
          }
        }
      }

    // cart - calculate grandtotal
      cartgrandtotal(data){
        this.total = 0;
        for(let element of data){
            this.total = Number(this.total) + Number((element['Product']['price'] - 
                                                            (element['Product']['price'] * (element['Product']['discount'] / 100)))*
                                                    Number(element['Cart']['product_count'])
                                            );
        }
        this.carttotal.next(Number(this.total));
        this.loading.next(false);
      }

    // remove cart item
      removeCartItem(product: Cart){
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
          this.loading.next(true);
        if (this.currentUser) {
          return this.http.post(this.apiLink+'projectapis/removeCartItem.json', product)
          .subscribe(response =>{
            console.log(response);
              // JSON.stringify(response);
              this.calculateCartProductCounts();
              this.loading.next(false);
          });
        }else{
          let local: Cart[];
          let count = 0;
          let i = 0;
          local = JSON.parse(localStorage.getItem("local_cart")) || [];
          for ( i = 0; i < local.length; i++ ) {
            if(local[i]['Cart']['product_id'] == product.product_id){
              local.splice(i,1);
            }
          }
          localStorage.setItem("local_cart", JSON.stringify(local));
          this.calculateCartProductCounts();
              this.loading.next(false);
        }
      }

      getProductDetail(product){
        return this.http.get(this.apiLink+'projectapis/product_details/'+product.product_id+'.json');
      }

    // Add local product to cart after login
      addlocalproducttoCart(product){
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.http.post(this.apiLink+'projectapis/AddlocalProducttocart.json', { product: product, user_id:this.currentUser.id } )
            .subscribe(
              data => {
                this.calculateCartProductCounts();
              });
      }

      // Products category wise
        getCategoryProductList(cat_id){
              // console.log('I am here');
          return this.http.get(this.apiLink+'projectapis/getCategoryProductList/'+cat_id+'.json')
            .subscribe(
            data => {
                  this.catProduct.next(data['response']);
                  console.log(this.catProduct);
                }
            )
        }

      // Services list wise
        getCategoryServiceList(cat_id){
              console.log('I am here '+ cat_id);
          return this.http.get(this.apiLink+'projectapis/getServicesCatewise/'+cat_id+'.json')
            .subscribe(
            data => {
                  this.catServices.next(data['response']);
                  console.log(this.catServices);
                }
            )
        }
     // Local market wise
        getLocalMarketList(cat_id){
          return this.http.get(this.apiLink+'projectapis/getLocalmarketbyCategory/'+cat_id+'.json')
            .subscribe(
            data => {
                  this.catLocalMarket.next(data['response']);
                  console.log(this.catLocalMarket);
                }
            )
        }
  // ================================= cart services ======================================//
}