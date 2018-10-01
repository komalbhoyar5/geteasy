import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { VerifyComponent } from './verify/verify.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersidebarComponent } from '../layout/usersidebar/usersidebar.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { AddressesComponent } from './addresses/addresses.component';
import { CartComponent } from './cart/cart.component';
import { WishlistComponent } from './wishlist/wishlist.component';

const customerRoutes: Routes = [
  { path: 'verify/:id', component: VerifyComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'login', component: LoginComponent},
  { path: 'profile', component: ProfileComponent},
  { path: 'change_password', component: ChangePasswordComponent},
  { path: 'manage_address', component: AddressesComponent},
  { path: 'cart', component: CartComponent},
  { path: 'wishlist', component: WishlistComponent}
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(customerRoutes, {useHash: true}),
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [ RouterModule ],

  declarations: [
  	VerifyComponent,
    RegisterComponent,
    ProfileComponent,
    UsersidebarComponent,
    LoginComponent,
    ChangePasswordComponent,
    AddressesComponent,
    CartComponent,
    WishlistComponent
  ]
})
export class CustomerRoutingModule { }