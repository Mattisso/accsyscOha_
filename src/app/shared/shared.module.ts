import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LoadingComponent } from './loading/loading.component';
import { ConvertToSpacesPipe } from './ConvertToSpacesPipe';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    ConvertToSpacesPipe,
  LoadingComponent],
  exports: [
    ConvertToSpacesPipe,
CommonModule,
FormsModule,
LoadingComponent
  ]
})
export class SharedModule { }
