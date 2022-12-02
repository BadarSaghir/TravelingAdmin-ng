import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from "src/app/gaurds/auth.gaurd";
import { DefaultComponent } from 'src/app/layout/default/default.component';
import { AddLocationComponent } from './add-location/add-location.component';
import { ViewLocationComponent } from './view-location/view-location.component';

const routes: Routes = [
  {
    path: "manage^location",
    canActivate: [AuthGuardService],

    // component: DefaultComponent,
    children: [
      {
        path: "Add^location",
        canActivate: [AuthGuardService],
        component: AddLocationComponent,
      },
      {
        path: "view^location",
        canActivate: [AuthGuardService],
        component: ViewLocationComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageLocationRoutingModule {}
