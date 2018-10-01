import { Component, OnInit } from '@angular/core';
import { AuthenticationService} from '../../_services/index';

@Component({
  selector: 'app-usersidebar',
  templateUrl: './usersidebar.component.html',
  styleUrls: ['./usersidebar.component.css']
})
export class UsersidebarComponent implements OnInit {

  constructor(
        private authenticationService: AuthenticationService
  ) { }

  	ngOnInit() {
  	}
	logout(){
      this.authenticationService.logout();
  	}
}
