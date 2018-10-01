import { Component, OnInit } from '@angular/core';
import { UserService} from '../../_services/index';
import { SweetAlertService } from 'angular-sweetalert-service';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-addresses',
  templateUrl: './addresses.component.html',
  styleUrls: ['./addresses.component.css']
})
export class AddressesComponent implements OnInit {
	selectedAddress : any ={};
  loading: any;
  userAddress: any;
  model: any = {};
  modeledit: any = {};
  showerror= true;
  addresserrors: any = {};
  user_id : any;
  mobile_no_error:any;
  private apiLink= environment.API_URL;
  public show:boolean = false;
  public hide:boolean = true;
  public editmode:boolean = false;

  public buttonName:any = 'Show';
  currentUser : any ={};
	constructor(
		private userService: UserService,
      private alertService: SweetAlertService,
      private http : HttpClient
	) { 
      this.userService.castuserAddress.subscribe(userAddress=> this.userAddress = userAddress);

	}

	ngOnInit() {
		this.userService.getUseraddressdetails();
      if (JSON.parse(localStorage.getItem('selectedAddress'))) {
          this.selectedAddress = JSON.parse(localStorage.getItem('selectedAddress'));
      };
	}

  toggle() {
	    this.show = !this.show;
	    this.hide = !this.hide;
	    // CHANGE THE NAME OF THE BUTTON.
	    if(this.show)  
	      this.buttonName = "Hide";
	    else
	      this.buttonName = "Show";
	}

	public getAddressDeliveryDetails(address){
      this.http.post(this.apiLink+'projectapis/getAddressDeliveryDetails.json',address)
          .subscribe(
              data => {
                  if (data['status'] == "Success") {
                      this.selectedAddress.address = address['Address'];
                      this.selectedAddress.delivery_details = data['response']['Pincodemasters'];
                      localStorage.setItem('selectedAddress', JSON.stringify(this.selectedAddress));
                      console.log(this.selectedAddress);
                  }else{
                      this.alertService.error({
                          title: 'Oops... error occurs',
                          text: data['message'],
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

  public addshippinAddress(){
    this.loading = true;
      this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
      this.model.user_id = this.currentUser.id;
        this.userService.addUseraddressdetails(this.model)
            .subscribe(
                data => {
                    if (data['status'] == "Success") {
                        this.userService.getUseraddressdetails();
                        this.model = {};
                        this.showerror = false;
                        this.alertService.success({
                            showConfirmButton: false,
                            position: 'top-end',
                            toast: true,
                            timer: 1500,
                            text: "New address updated successfully."
                        });
                        this.loading = false;
                        this.hide = !this.hide;
                        this.show = !this.show;
                    }else{
                        if (data['message']['mobile_no']) {
                          this.mobile_no_error = data['message']['mobile_no'];
                        }
                        this.alertService.error({
                            title: 'Oops... error occurs',
                            text: "Unable to add new address, please check information you have entered is correct.",
                        });
                        this.loading = false;
                        this.addresserrors = data['message'];
                        return this.addresserrors;
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

  public deleteAddressDetail(add_id){
    console.log(add_id);

    this.http.post(this.apiLink+'projectapis/DeleteUserAddressDetails.json', { id : add_id })
      .subscribe(
          data => {
              if (data['status'] == "Success") {
                this.userService.getUseraddressdetails();
                this.alertService.success({
                    showConfirmButton: false,
                    position: 'top-end',
                    timer: 1500,
                    toast: true,
                    text: "Address deleted successfully."
                });
              }else{
                  this.alertService.error({
                      title: 'Oops... error occurs',
                      text: data['message'],
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

  public editmodeOn(address){
    this.hide = !this.hide;
    this.modeledit = address;
    this.editmode = !this.editmode;
  }
  
  public EditUserAddressDetails(){

      this.http.post(this.apiLink+'projectapis/EditUserAddressDetails.json',this.modeledit)
          .subscribe(
              data => {
                  if (data['status'] == "Success") {
                      this.userService.getUseraddressdetails();
                        this.model = {};
                        this.showerror = false;
                        this.alertService.success({
                            showConfirmButton: false,
                            position: 'top-end',
                            toast: true,
                            timer: 1500,
                            text: data['message']
                        });
                        this.loading = false;
                        this.hide = !this.hide;
                        this.editmode = !this.editmode;
                  }else{
                      if (data['message']['mobile_no']) {
                        this.mobile_no_error = data['message']['mobile_no'];
                      }
                      this.alertService.error({
                          title: 'Oops... error occurs',
                          text: 'Unable to update address, please check information you have entered is correct.',
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

  public SetDefaultAddress(address_id){
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.user_id = this.currentUser.id;
    
    console.log(address_id+' '+this.user_id);
    this.http.post(this.apiLink+'projectapis/setUserActiveAddress.json', {'address_id': address_id, "user_id": this.user_id})
          .subscribe(
              data => {
                  if (data['status'] == "Success") {
                        this.alertService.success({
                            showConfirmButton: false,
                            position: 'top-end',
                            toast: true,
                            timer: 1500,
                            text: data['message']
                        });
                  }else{
                      this.alertService.error({
                          title: 'Oops... error occurs',
                          text: data['message'],
                      });
                  }
              },
              error => {
                  this.alertService.error({
                      title: 'Oops... error occurs',
                      text: error.message,
                  });
          });
  }
}
