import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageReviewRoutingModule } from './manage-review-routing.module';
import { ViewReviewComponent } from './view-review/view-review.component';
import { MatModule } from 'src/app/shared/mat.module';
import { HttpClientModule } from '@angular/common/http';
import { NgxStarRatingModule } from 'ngx-star-rating';


@NgModule({
  declarations: [
    ViewReviewComponent
  ],
  imports: [
    CommonModule,
    ManageReviewRoutingModule,
    NgxStarRatingModule,
    MatModule,
    HttpClientModule
  ]
})
export class ManageReviewModule { }
