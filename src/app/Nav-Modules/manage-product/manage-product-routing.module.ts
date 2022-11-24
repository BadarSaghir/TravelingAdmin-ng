import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from 'src/app/layout/default/default.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ViewProductComponent } from './view-product/view-product.component';

const routes: Routes = [
  {
    path: 'manage-product',
    component: DefaultComponent,
    children: [
      { path: 'Add^product', component: AddProductComponent },
      { path: 'View^product', component: ViewProductComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageProductRoutingModule {}
