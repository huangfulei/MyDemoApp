import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from "../../home/home.component";
import {LoginComponent} from "./login.component";


const routes: Routes = [
  {
    path:'',
    component: LoginComponent,
    // canDeactivate:
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
