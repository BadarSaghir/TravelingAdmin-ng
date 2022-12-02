import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from "src/app/gaurds/auth.gaurd";
import { DefaultComponent } from 'src/app/layout/default/default.component';
import { AddSellerComponent } from './add-seller/add-seller.component';
import { ViewSellerComponent } from './view-seller/view-seller.component';

const routes: Routes = [
  {
    path: "manage-seller",
    // component: DefaultComponent,
    canActivate: [AuthGuardService],

    children: [
      {
        path: "Addnew^Seller",
        canActivate: [AuthGuardService],
        component: AddSellerComponent,
      },
      {
        path: "seller^view",
        canActivate: [AuthGuardService],
        component: ViewSellerComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageSellerRoutingModule {}
