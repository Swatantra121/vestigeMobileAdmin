import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//importing error-messages and angular-material module
import { AdminPanelMaterialModule } from 'src/app/material.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { SharedModule } from 'src/app/components/common/shared.module';

//importing the component used in the invoice
import { InvoiceListingComponent } from './invoice-listing/invoice-listing.component';
import { ViewInvoiceComponent } from './view-invoice/view-invoice.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminPanelMaterialModule,
    PipesModule,
    SharedModule
  ],
  declarations: [InvoiceListingComponent, ViewInvoiceComponent]
})
export class InvoiceModule { }
