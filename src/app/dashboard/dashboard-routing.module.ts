import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard.component';
import { ProductUpdateComponent } from './products/product-update/product-update.component';

const routes: Routes = [{ path: '', component: DashboardComponent },
  { path: 'product-update', component: ProductUpdateComponent },
  { path: 'product-update/:id', component: ProductUpdateComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
