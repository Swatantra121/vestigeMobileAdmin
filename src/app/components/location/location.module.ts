import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//importing error-messages and angular-material module
import { AdminPanelMaterialModule } from 'src/app/material.module';

//importing the component used in the location catalogue
import { LocationListingComponent } from './location-listing/location-listing.component';
import { InformationComponent } from './information/information.component';
import { AddressHoursComponent } from './address-hours/address-hours.component';
import { InventoryComponent } from './inventory/inventory.component';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminPanelMaterialModule,
  ],
  declarations: [LocationListingComponent, InformationComponent, AddressHoursComponent, InventoryComponent]
})
export class LocationModule { }
