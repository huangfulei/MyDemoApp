import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {LoginComponent} from "../login/login.component";
import {SignUpComponent} from "./sign-up.component";


const routes: Routes = [
  {
    path:'',
    component: SignUpComponent,
    // canDeactivate:
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignUpRoutingModule { }
