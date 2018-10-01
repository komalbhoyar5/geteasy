import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {StarRatingModule} from 'angular-star-rating';
import { OwlModule } from 'ngx-owl-carousel';


import { ServicesComponent } from './services/services.component';
import { ServiceDetailsComponent } from './service-details/service-details.component';
import { LocalMarketComponent } from './local-market/local-market.component';
import { VendorComponent } from './vendor/vendor.component';

const pageRoutes: Routes = [
  { path: 'services/:id', component: ServicesComponent },
  { path: 'service/:service_cat/:id/:service_name', component: ServiceDetailsComponent },
  { path: 'vendor/:cattitle/:localm_id/:user_id/:localm_title', component: VendorComponent },
  { path: 'local_market/:id/:cattitle', component: LocalMarketComponent }
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(pageRoutes, {useHash: true}),
    FormsModule,
    ReactiveFormsModule,
    OwlModule,
    StarRatingModule.forRoot()
  ],
  exports: [ RouterModule ],

  declarations: [
  		ServicesComponent,
	    ServiceDetailsComponent,
	    LocalMarketComponent,
      VendorComponent
  ]
})
export class PageRoutingModule { }
