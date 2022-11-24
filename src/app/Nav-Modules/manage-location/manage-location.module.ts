import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageLocationRoutingModule } from './manage-location-routing.module';
import { AddLocationComponent } from './add-location/add-location.component';
import { ViewLocationComponent } from './view-location/view-location.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { MatModule } from 'src/app/shared/mat.module';


@NgModule({
  declarations: [
    AddLocationComponent,
    ViewLocationComponent
  ],
  imports: [
    CommonModule,
    ManageLocationRoutingModule,
    ReactiveFormsModule,
    NgxStarRatingModule,
    MatModule
  ]
})
export class ManageLocationModule { }
