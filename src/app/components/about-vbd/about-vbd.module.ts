import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminPanelMaterialModule } from 'src/app/material.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { SharedModule } from 'src/app/components/common/shared.module';

import { AboutVBDListComponent } from './about-vbd-list/about-vbd-list.component';
import { PageInformationComponent } from './page-information/page-information.component';
import { ContentComponent } from './content/content.component';
import { AboutVBDmetaComponent } from './about-vbdmeta/about-vbdmeta.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminPanelMaterialModule,
    PipesModule,
    SharedModule
  ],
  declarations: [
    AboutVBDListComponent,
    PageInformationComponent,
    ContentComponent,
    AboutVBDmetaComponent]
})
export class AboutVBDModule { }
