import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from 'src/app/layout/default/default.component';
// import { AddUserComponent } from './add-user/add-user.component';
import { ViewUserComponent } from './view-user/view-user.component';
import { AngularFireAuthGuard } from "@angular/fire/compat/auth-guard";
import { AuthGuardService } from "src/app/gaurds/auth.gaurd";

const routes: Routes = [
  {
    path: "manage^user",
    // component: DefaultComponent,
    canActivate: [AuthGuardService],
    children: [
      // {
      //   path: "Addnew^user",
      //   canActivate: [AuthGuardService],

      //   component: AddUserComponent,
      // },
      {
        path: "view^users",
        canActivate: [AuthGuardService],

        component: ViewUserComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageUserRoutingModule {}
