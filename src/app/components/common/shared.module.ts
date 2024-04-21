import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPanelMaterialModule } from 'src/app/material.module';
import { AngularEditorModule } from '@kolkov/angular-editor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CatelogueAccordianComponent } from 'src/app/components/common/catelogue-accordian/catelogue-accordian.component';
import { DialogBoxComponent, DialogDataContent } from 'src/app/components/common/dialog-box/dialog-box.component';

@NgModule({
  imports: [
    CommonModule,
    AngularEditorModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AdminPanelMaterialModule
  ],
  entryComponents: [DialogDataContent],
  declarations: [ CatelogueAccordianComponent, DialogBoxComponent, DialogDataContent ],
  exports: [
    CatelogueAccordianComponent,
    DialogBoxComponent,
    DialogDataContent
  ],
})
export class SharedModule { }
