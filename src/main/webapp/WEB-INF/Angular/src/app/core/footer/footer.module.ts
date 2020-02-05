import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer.component';
import { AddButtonComponent } from './add-button/add-button.component';

@NgModule({
  declarations: [FooterComponent, AddButtonComponent],
  imports: [
    CommonModule
  ],
  exports:[
      FooterComponent
  ]

})
export class FooterModule { }
