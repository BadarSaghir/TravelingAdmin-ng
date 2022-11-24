import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from 'src/app/layout/default/default.component';
import { AddUserComponent } from './add-user/add-user.component';
import { ViewUserComponent } from './view-user/view-user.component';

const routes: Routes = [
  {
    path: 'manage^user',
    component: DefaultComponent,
    children: [
      {
        path: 'Addnew^user',
        component: AddUserComponent,
      },
      {
        path: 'view^users',
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
