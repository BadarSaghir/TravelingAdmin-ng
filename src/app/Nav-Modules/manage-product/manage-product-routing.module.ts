import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from 'src/app/gaurds/auth.gaurd';
import { DefaultComponent } from "src/app/layout/default/default.component";
import { AddProductComponent } from "./add-product/add-product.component";
import { ViewProductComponent } from "./view-product/view-product.component";

const routes: Routes = [
  {
    path: "manage-product",
    // component: DefaultComponent,
    canActivate: [AuthGuardService],

    children: [
      {
        path: "Add^product",
        canActivate: [AuthGuardService],

        component: AddProductComponent,
      },
      {
        path: "Edit^product/:id",
        canActivate: [AuthGuardService],
        component: AddProductComponent,
      },
      {
        path: "View^product",
        canActivate: [AuthGuardService],
        component: ViewProductComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageProductRoutingModule {}
