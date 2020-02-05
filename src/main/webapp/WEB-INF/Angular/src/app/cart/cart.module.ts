import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CartRoutingModule } from './cart-routing.module';
import {CartComponent} from "./cart.component";
import {MatListModule} from "@angular/material/list";
import {MaterialModule} from "../shared/material.module";


@NgModule({
  declarations: [CartComponent],
    imports: [
        CommonModule,
        CartRoutingModule,
        MaterialModule
    ]
})
export class CartModule { }
