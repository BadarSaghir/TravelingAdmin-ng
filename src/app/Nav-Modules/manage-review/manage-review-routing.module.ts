import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DefaultComponent } from 'src/app/layout/default/default.component';
import { ViewReviewComponent } from './view-review/view-review.component';

const routes: Routes = [
  {
    path: 'managereview',
    component: DefaultComponent,
    children: [{ path: 'viewAll^Reviews', component: ViewReviewComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManageReviewRoutingModule {}
