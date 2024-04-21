import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Ng2ImgMaxModule } from 'ng2-img-max';

//importing error-messages and angular-material module
import { AdminPanelMaterialModule } from 'src/app/material.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { SharedModule } from 'src/app/components/common/shared.module';
// import { CatelogueAccordianComponent } from 'src/app/components/common/catelogue-accordian/catelogue-accordian.component';

//importing the component used in the product catalogue
import { GeneralComponent } from './general/general.component';
import { ProductSettingComponent } from './product-setting/product-setting.component';
import { PriceComponent } from './price/price.component';
import { RelatedProductsComponent } from './related-products/related-products.component';
import { UpSellsComponent } from './up-sells/up-sells.component';
import { CrossSellsComponent } from './cross-sells/cross-sells.component';
import { ImagesComponent } from './images/images.component';
import { ProductMetaInfoComponent } from './product-meta-info/product-meta-info.component';
import { ProductInventoryComponent } from './product-inventory/product-inventory.component';
import { ProductCategoriesComponent } from './product-categories/product-categories.component';
import { ProductListingComponent } from './product-listing/product-listing.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminPanelMaterialModule,
    PipesModule,
    Ng2ImgMaxModule,
    SharedModule
  ],
  declarations: [ 
    GeneralComponent, 
    ProductSettingComponent, 
    PriceComponent, 
    RelatedProductsComponent, 
    UpSellsComponent, 
    CrossSellsComponent, 
    ImagesComponent, 
    ProductMetaInfoComponent, 
    ProductInventoryComponent, 
    ProductCategoriesComponent ,
    ProductListingComponent,
    // CatelogueAccordianComponent
  ]
})
export class ProductModule { }
 