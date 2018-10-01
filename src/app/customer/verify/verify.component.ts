import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { SweetAlertService } from 'angular-sweetalert-service';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {
  	private apiLink = 'http://rnrsoft.in/testing/';
	id: any;
    returnUrl: string;

	constructor(private http : HttpClient,
				private route : ActivatedRoute,
    			private router:Router,
    			private alertService: SweetAlertService
    			) { }

	ngOnInit() {
		this.route.params.subscribe(params => {
	      this.id = params['id'] //log the value of id
	      this.verifyAccount(this.id);
	    });
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

	}

        testResponse: any;
	verifyAccount(id){
		return this.http.get(this.apiLink+'projectapis/verifyAccount/'+id+'.json')
	    .subscribe(
	    data => {
                  this.testResponse = data;
	          console.log("I CANT SEE verified DATA HERE: ", this.testResponse);
	          if (this.testResponse.status == 'Success') {
	          		this.alertService.success({
                            title: 'Verified!!',
                            text: this.testResponse.message
                        });
                    this.router.navigate([this.returnUrl]);
	          }
	          else if(this.testResponse.status == 'Warning'){
	          		this.alertService.warning({
                            title: 'Already verified!!',
                            text: this.testResponse.message
                        });
                    this.router.navigate([this.returnUrl]);
	          }else{
	          		this.alertService.error({
                            title: 'Oops.. error occurs!!',
                            text: this.testResponse.message
                        });
                    this.router.navigate([this.returnUrl]);
	          }
	        }
	    )
	}
}
