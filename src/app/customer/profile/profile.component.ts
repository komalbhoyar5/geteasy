import { Component, OnInit } from '@angular/core';
import { UserService} from '../../_services/index';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { SweetAlertService } from 'angular-sweetalert-service';
import { environment } from '../../../environments/environment';
import { FormsModule } from '@angular/forms';
declare var jQuery: any;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public show:boolean = false;
  public hide:boolean = true;
  public buttonName:any = 'Show';
  public user:any = '';
  showerror= true;
  private apiLink= environment.API_URL;

  currentUser : any ={};
  model: any = {};
  userAddress: any;
  constructor(
              private userService: UserService, 
              private http : HttpClient,
              private alertService: SweetAlertService
              ) { 
      // this.userService.castuserAddress.subscribe(userAddress=> this.userAddress = userAddress);
  }

  ngOnInit() {
    this.getUserDetails();
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
  
  public getUserDetails(){
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    console.log(this.apiLink+'projectapis/getCustomerProfile.json');
        this.http.post(this.apiLink+'projectapis/getCustomerProfile.json', { id: this.currentUser.id })
          .subscribe(
              data => {
                console.log(data);
                  if (data['status'] == "Success") {
                    this.user = data['response'];
                    this.model = data['response']['User'];
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
                  // this.loading = false;
          });
  }

  editUserProfile(){
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
    this.model.id = this.currentUser.id;
    console.log(this.model);
    this.http.post(this.apiLink+'projectapis/updateProfile.json', this.model)
          .subscribe(
              data => {
                // console.log(data);
                  if (data['status'] == "Success") {
                    this.showerror = false;
                    this.alertService.success({
                        showConfirmButton: false,
                        position: 'top-end',
                        toast: true,
                        timer: 1500,
                        text: "New address updated successfully."
                    });
                    this.show = !this.show;
                    this.hide = !this.hide;
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
                  // this.loading = false;
          });
  }

  ngAfterViewChecked(): void {
    jQuery(document).ready(function(){
      jQuery('.i-checks').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green',
      });
    });
  }
}
