import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from 'src/app/layout/default/default.component';
import { AddSellerComponent } from './add-seller/add-seller.component';
import { ViewSellerComponent } from './view-seller/view-seller.component';

const routes: Routes = [
  {
    path: "manage-seller",
    // component: DefaultComponent,
    children: [
      { path: "Addnew^Seller", component: AddSellerComponent },
      { path: "seller^view", component: ViewSellerComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageSellerRoutingModule {}
