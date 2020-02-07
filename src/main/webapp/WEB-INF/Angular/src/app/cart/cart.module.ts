import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CartRoutingModule} from './cart-routing.module';
import {CartComponent} from "./cart.component";
import {MaterialModule} from "../shared/material.module";
import {CartService} from "./cart.service";


@NgModule({
    declarations: [CartComponent],
    imports: [
        CommonModule,
        CartRoutingModule,
        MaterialModule
    ],
    providers: [CartService]
})
export class CartModule {
}
