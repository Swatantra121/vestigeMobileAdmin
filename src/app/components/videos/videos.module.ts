import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AdminPanelMaterialModule } from 'src/app/material.module';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { SharedModule } from 'src/app/components/common/shared.module';

import { VideoComponent } from 'src/app/components/videos/video/video.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminPanelMaterialModule,
    PipesModule,
    SharedModule
  ],
  declarations: [VideoComponent]
})
export class VideosModule { }
