import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {PaymentComponent} from "./payment/payment.component";

const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'pay',
        component: PaymentComponent
    },
    {
        path: 'login',
        loadChildren: () => import('./core/login/login.module').then(m => m.LoginModule)
    },
    {
        path: 'sign_up',
        loadChildren: () => import('./core/sign-up/sign-up.module').then(m => m.SignUpModule)
    },
    {
        path: 'products',
        loadChildren: () => import('./product/product.module').then(m => m.ProductModule)
    },
    {
        path: 'cart',
        loadChildren: () => import('./cart/cart.module').then(m => m.CartModule)
    },
    {
        path: '**',
        redirectTo: '/home'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
