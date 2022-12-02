import { NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";
import { AuthGuardService } from "src/app/gaurds/auth.gaurd";
import { DefaultComponent } from "src/app/layout/default/default.component";
import { ViewReviewComponent } from "./view-review/view-review.component";

const routes: Routes = [
  {
    path: "managereview",
    // component: DefaultComponent,
    canActivate: [AuthGuardService],

    children: [
      {
        path: "viewAll^Reviews",
        canActivate: [AuthGuardService],
        component: ViewReviewComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageReviewRoutingModule {}
