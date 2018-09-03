import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { RouterModule, Routes } from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// installed plugins
import { SweetAlertService } from 'angular-sweetalert-service';
import { NgxCarouselModule } from 'ngx-carousel';
import {StarRatingModule} from 'angular-star-rating';
import { OwlModule } from 'ngx-owl-carousel';

// components
import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { CategoryComponent } from './category/category.component';
import { ProductsComponent } from './products/products.component';


import { GeneralsettingsService, ProductService } from './_services/index';
import { ServicesComponent } from './pages/services/services.component';
import { ServiceDetailsComponent } from './pages/service-details/service-details.component';
import { LocalMarketComponent } from './pages/local-market/local-market.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'category/:id', component: CategoryComponent },
  { path: 'product/:id', component: ProductsComponent },
  { path: 'services/:id', component: ServicesComponent },
  { path: 'service/:id', component: ServiceDetailsComponent },
  { path: 'local_market/:id', component: LocalMarketComponent }
  // { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    CategoryComponent,
    ProductsComponent,
    ServicesComponent,
    ServiceDetailsComponent,
    LocalMarketComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes, {useHash: true}),
    NgxCarouselModule,
    ReactiveFormsModule,
    FormsModule,
    OwlModule,
    StarRatingModule.forRoot()
  ],
  providers: [
              GeneralsettingsService,
              ProductService,
              SweetAlertService,
              {provide: APP_BASE_HREF, useValue: '/'}
            ],
  bootstrap: [AppComponent]
})
export class AppModule { }
