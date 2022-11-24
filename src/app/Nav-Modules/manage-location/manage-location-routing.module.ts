import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from 'src/app/layout/default/default.component';
import { AddLocationComponent } from './add-location/add-location.component';
import { ViewLocationComponent } from './view-location/view-location.component';

const routes: Routes = [
  {
    path: 'manage^location',
    component: DefaultComponent,
    children: [
      { path: 'Add^location', component: AddLocationComponent },
      { path: 'view^location', component: ViewLocationComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageLocationRoutingModule {}
