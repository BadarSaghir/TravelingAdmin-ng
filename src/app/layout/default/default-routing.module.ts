import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from "src/app/gaurds/auth.gaurd";
import { DashboardComponent } from 'src/app/modules/dashboard/dashboard.component';
import { DefaultComponent } from './default.component';


const routes: Routes = [
  {
    path: "",
    children: [
      {
        path: "",
        component: DashboardComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: "dashboard",
        component: DashboardComponent,
        canActivate: [AuthGuardService],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DefaultRoutingModule {}
