import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ProductRoutingModule} from './product-routing.module';
import {ProductComponent} from "./product.component";
import {MaterialModule} from "../shared/material.module";
import {LogInReminderComponent} from "../shared/pop-up/log-in-reminder/log-in-reminder.component";


@NgModule({
    declarations: [ProductComponent, LogInReminderComponent],
    imports: [
        CommonModule,
        ProductRoutingModule,
        MaterialModule
    ],
    providers: [],
    entryComponents: [LogInReminderComponent]

})
export class ProductModule {
}
