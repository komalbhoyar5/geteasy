import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/observable/of';
import { Observable,Subject} from 'rxjs';
@Injectable()
export class GeneralsettingsService {
	// allcartdata
   private subject = new Subject<any>();

    constructor(private http: HttpClient,
        ) { 
    }
    public apiLink = 'http://rnrsoft.in/testing/';

    getSiteURL(){
	    this.subject.next({ url: this.apiLink });
  	}
}