import { Component, OnInit } from '@angular/core';
import { environment } from '../../../environments/environment';
declare var jQuery: any;
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SweetAlertService } from 'angular-sweetalert-service';
import { ProductService } from '../../_services/index';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  wishlist:any;
	wishlistdata:any = {};

	public apiLink= environment.API_URL;
	currentUser: any;
  constructor(private http : HttpClient, 
      				private route : ActivatedRoute,
              private productService: ProductService,
              private alertService: SweetAlertService,
              private router:Router
  			) { }

  ngOnInit() {
  	this.getWishlist();
  }

  getWishlist(){
		this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
	    return this.http.get(this.apiLink+'projectapis/getWishlist/'+ this.currentUser.id +'.json')
	    .subscribe(
	    data => {
	        this.wishlist = data['response'];
	        console.log("I CANT SEE wishlist DATA HERE: ",  this.wishlist);
	        return this.wishlist;
	        }
	    )
  }
   getSlug(text){
    if (text) {
      return text.replace(/\W+/g, '-');
    }
  }

  removeProductFromwishlist(id){
		this.wishlistdata.id = id;
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    if (this.currentUser) {
      this.wishlistdata.user_id = this.currentUser.id;
    }
    return this.http.post(this.apiLink+'projectapis/removeProductFromwishlist.json', this.wishlistdata)
    .subscribe(
    data => {
        this.wishlist = data['response'];
        this.productService.wishcount();
        this.alertService.success({
              toast: true,
              // title: 'Product has been added to cart',
              text: data['message'],
              timer: 1500,
              showConfirmButton: false,
              position: 'top-end',
              margin: '11em 0em'
          });
        }
    )
  }
}
