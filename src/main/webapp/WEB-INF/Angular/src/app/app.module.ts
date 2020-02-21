import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material';
import {ReactiveFormsModule} from '@angular/forms';
import {NgSelectModule} from '@ng-select/ng-select';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {FooterModule} from "./core/footer/footer.module";
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {AppRoutingModule} from "./app-routing.module";
import {MenuModule} from "./core/menu/menu.module";
import {FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {TokenInterceptor} from "./shared/interceptor/tokenInterceptor";
import {HomeModule} from "./home/home.module";
import {PaymentComponent} from './payment/payment.component';
import {CookieService} from "ngx-cookie-service";
import {LoadingIndicatorComponent} from './core/loading-indicator/loading-indicator.component';
import {SharedModule} from "./shared/shared.module";
import {HashLocationStrategy, LocationStrategy} from "@angular/common";

@NgModule({
    declarations: [
        AppComponent,
        PaymentComponent,
        LoadingIndicatorComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        FontAwesomeModule,
        // shared components and material module
        SharedModule,
        // AppRoutingModule,
        HomeModule,
        MenuModule,
        AppRoutingModule,
        // expansion animation
        BrowserAnimationsModule,
        // imported here because dialog components are provided here
        ReactiveFormsModule,
        // imported for ng select
        NgSelectModule,
        FooterModule,
        ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),

        //used to not include the default format
        //MomentDateModule,

    ],
    providers: [
        CookieService,
        {provide: LocationStrategy, useClass: HashLocationStrategy},
        // disable backdrop for dialog window
        {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}},
        {provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true}
        // `MomentDateAdapter` can be automatically provided by importing `MomentDateModule` in your
        // application's root module. We provide it at the component level here, due to limitations of
        // our example generation script.
        // {provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE]},
        //
        // {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
