import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GridPage } from './grid.page';
import {AuthGuard} from "../guard/auth-guard.service";

const routes: Routes = [
  {
    path: '',
    component: GridPage,
    canActivate: [AuthGuard],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GridPageRoutingModule {}
