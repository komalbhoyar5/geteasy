import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {APP_BASE_HREF} from '@angular/common';
import { DatePipe } from '@angular/common';

// installed plugins
import { SweetAlertService } from 'angular-sweetalert-service';
import { NgxCarouselModule } from 'ngx-carousel';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// components
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';


import { GeneralsettingsService, ProductService, UserService, AuthenticationService } from './_services/index';

import { AppRoutingModule } from './app-routing.module';
import { PageRoutingModule } from './pages/page-routing.module';
import { CustomerRoutingModule } from './customer/customer-routing.module';
import { CheckoutComponent } from './payment/checkout/checkout.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    // RouterModule.forRoot(routes, {useHash: true}),
    NgxCarouselModule,
    AppRoutingModule,
    PageRoutingModule,
    CustomerRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
              GeneralsettingsService,
              ProductService,
              SweetAlertService,
              DatePipe,
              UserService,
              AuthenticationService,
              {provide: APP_BASE_HREF, useValue: '/'}
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }
