import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//importing error-messages and angular-material module
import { AdminPanelMaterialModule } from 'src/app/material.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { SharedModule } from 'src/app/components/common/shared.module';
// import { CatelogueAccordianComponent } from 'src/app/components/common/catelogue-accordian/catelogue-accordian.component';

import { CategoryProductsComponent } from './category-products/category-products.component';
import { MetaInformationComponent } from './meta-information/meta-information.component';
import { CategoryInformationComponent } from './category-information/category-information.component';
import { CatalogueComponent } from 'src/app/components/category/catalogue/catalogue.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminPanelMaterialModule,
    PipesModule,
    SharedModule
  ],
  declarations: [CategoryProductsComponent, MetaInformationComponent, CategoryInformationComponent, CatalogueComponent ]
})
export class CategoryModule { }
