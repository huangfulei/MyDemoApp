import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SignUpRoutingModule} from './sign-up-routing.module';
import {SignUpComponent} from "./sign-up.component";
import {ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../../shared/material.module";
import {SignUpService} from "./sign-up.service";


@NgModule({
    declarations: [SignUpComponent],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        MaterialModule,
        SignUpRoutingModule
    ],
    providers: [SignUpService]
})
export class SignUpModule {
}
