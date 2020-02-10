import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MenuComponent} from "./menu.component";
import {FaIconLibrary, FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faBars, faShoppingCart, faTimes} from "@fortawesome/free-solid-svg-icons";
import {RouterModule} from "@angular/router";
import {MatMenuModule} from "@angular/material/menu";
import {MaterialModule} from "../../shared/material.module";

@NgModule({
    declarations: [MenuComponent],
    imports: [
        CommonModule,
        FontAwesomeModule,
        RouterModule,
        MatMenuModule,
        MaterialModule
    ],
    exports: [
        MenuComponent
    ],
    providers: []
})
export class MenuModule {
    constructor(private library: FaIconLibrary) {
        library.addIcons(faBars, faTimes, faShoppingCart)
    }
}
