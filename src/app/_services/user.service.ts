import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { User, Cart, Address, Companydetails } from '../_models/index';
import 'rxjs/add/observable/of';
import { environment } from '../../environments/environment';

@Injectable()
export class UserService {
    // user Address array
        private userAddress = new BehaviorSubject([]);
        castuserAddress = this.userAddress.asObservable();
    // company details array
        private conpanyAddress = new BehaviorSubject([]);
        castconpanyAddress = this.conpanyAddress.asObservable();
        currentUser : any ={};
    public apiLink= environment.API_URL;


    constructor(private http: HttpClient) { 
        this.getUseraddressdetails();
    }
    // NavbarCounts
    count = 0;
    getAll() {
        return this.http.get<User[]>('/api/users');
    }

    create(user: User) {
        return this.http.post(this.apiLink+'projectapis/createUser.json', user);
    }

    update(user: User) {
        return this.http.put(this.apiLink+'projectapis/updateProfile.json' + user.id, user);
    }

    delete(id: number) {
        return this.http.delete(this.apiLink+'projectapis/' + id);
    }

    addToCart(cart: Cart) {
        return this.http.post(this.apiLink+'projectapis/addToCart.json', cart);
    }
    addUseraddressdetails(address){
        return this.http.post(this.apiLink+'projectapis/addUseraddressdetails.json', address);
    }

    getUseraddressdetails(){
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (this.currentUser) {
             return this.http.post<Address[]>(this.apiLink+'projectapis/getUserAddressDetails.json', { user_id : this.currentUser.id })
            .subscribe(
                    data => {
                        JSON.stringify(data);
                        this.userAddress.next(data['response']);
                        return data;
                    }
            );
        }
        // .map(address =>{
        // });
    }

    
}