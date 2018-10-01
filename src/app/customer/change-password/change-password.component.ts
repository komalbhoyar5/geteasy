import { Component, OnInit } from '@angular/core';
import { UserService} from '../../_services/index';
import { SweetAlertService } from 'angular-sweetalert-service';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
    private apiLink= environment.API_URL;
    model: any = {};
    currentUser : any ={};
    showerror= true;

	constructor(
	  	private userService: UserService,
        private alertService: SweetAlertService,
        private http : HttpClient
    ) { }

  ngOnInit() {
  }

  	public changePassword(){
  		this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
		  this.model.id = this.currentUser.id;
        this.http.post(this.apiLink+'projectapis/change_password.json',this.model)
            .subscribe(
                data => {
                    if (data['status'] == "Success") {
                          this.model = {};
                          this.showerror = false;
                          this.alertService.success({
                              showConfirmButton: false,
                              position: 'top-end',
                              toast: true,
                              timer: 1500,
                              text: "Password updated successfully."
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
