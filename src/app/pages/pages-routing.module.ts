import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {IndexComponent} from "./index/index.component";
import {TokenValidationGuard} from "../guards/token-validation.guard";
import {AdminValidationGuard} from "../guards/admin-validation.guard";

const routes: Routes = [
  { path: '', component: IndexComponent },

  {
    path: 'dashboard',
    loadChildren: () => import('./protected/protected.module').then(m => m.ProtectedModule),
    canActivate: [ TokenValidationGuard, AdminValidationGuard ],
    canLoad: [ TokenValidationGuard, AdminValidationGuard ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
