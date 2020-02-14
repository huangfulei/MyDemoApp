import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LoginComponent} from "./login.component";
import {ReactiveFormsModule} from "@angular/forms";
import {MaterialModule} from "../../shared/material.module";
import {LoginRoutingModule} from "./login-routing.module";
import {faLock} from "@fortawesome/free-solid-svg-icons";
import {FaIconLibrary, FontAwesomeModule} from "@fortawesome/angular-fontawesome";

@NgModule({
    declarations: [LoginComponent],
    imports: [
        CommonModule,
        MaterialModule,
        ReactiveFormsModule,
        LoginRoutingModule,
        FontAwesomeModule
    ],
    providers: []
})
export class LoginModule {
    constructor(private library: FaIconLibrary) {
        library.addIcons(faLock, )
    }
}
