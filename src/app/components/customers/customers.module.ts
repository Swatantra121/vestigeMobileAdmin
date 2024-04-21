import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OwlModule } from 'ngx-owl-carousel';

import { CustomersComponent } from './customers/customers.component';
import { CustomerInfoComponent } from './customer-info/customer-info.component';
import { VbdWalletComponent } from './vbd-wallet/vbd-wallet.component';
import { AccountInfoComponent } from './account-info/account-info.component';
import { AddressesComponent } from './addresses/addresses.component';
import { OrdersComponent } from './orders/orders.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { WishlistComponent } from './wishlist/wishlist.component';

//importing error-messages and angular-material module
import { AdminPanelMaterialModule } from 'src/app/material.module';
import { PipesModule } from 'src/app/pipes/pipes.module';


@NgModule({
  imports: [
    CommonModule,
    PipesModule,
    FormsModule,
    ReactiveFormsModule,
    AdminPanelMaterialModule,
    OwlModule
  ],
  declarations: [CustomersComponent,
    CustomerInfoComponent,
    VbdWalletComponent,
    AccountInfoComponent,
    AddressesComponent,
    OrdersComponent,
    ShoppingCartComponent,
    WishlistComponent,
  ]
})
export class CustomersModule { }
