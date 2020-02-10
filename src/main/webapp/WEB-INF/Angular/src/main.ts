import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppInjector} from "./app/core/services/app-injector";
import {AppModule} from './app/app.module';
import {environment} from './environments/environment';
import 'hammerjs';

if (environment.production) {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule).then((moduleRef) => {
    AppInjector.setInjector(moduleRef.injector);
}).catch(err => console.error(err));
