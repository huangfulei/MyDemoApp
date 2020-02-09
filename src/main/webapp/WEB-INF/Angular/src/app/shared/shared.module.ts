import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MaterialModule} from "./material.module";
import {MessagesComponent} from "./components/message/message.component";


@NgModule({
    declarations: [MessagesComponent],
    imports: [
        CommonModule,
        MaterialModule
    ],
    exports: [MessagesComponent, CommonModule, MaterialModule]
})
export class SharedModule {
}
