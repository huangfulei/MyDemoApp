import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HeadingComponent} from './heading.component';
import {SlidesComponent} from './slides/slides.component';
import {MaterialModule} from '../../shared/material.module';

@NgModule({
    declarations: [HeadingComponent, SlidesComponent],
    imports: [
        CommonModule,
        MaterialModule,
    ],
    exports: [
        HeadingComponent
    ]
})
export class HeadingModule {
}
