import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    // BreadCrumbComponent,
    // PageHeaderComponent,
    // FormFildErrorComponent,
    // ServerErrorMessagesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    // shared modules
    CommonModule,
    ReactiveFormsModule,
    RouterModule,

    //shared components
    // BreadCrumbComponent,
    // PageHeaderComponent,
    // FormFildErrorComponent,
    // ServerErrorMessagesComponent
  ]
})
export class SharedModule { }
