import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageSellerRoutingModule } from './manage-seller-routing.module';
import { AddSellerComponent } from './add-seller/add-seller.component';
import { ViewSellerComponent } from './view-seller/view-seller.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatModule } from 'src/app/shared/mat.module';
import { AuthGuardService } from "src/app/gaurds/auth.gaurd";


@NgModule({
  declarations: [AddSellerComponent, ViewSellerComponent],
  providers: [AuthGuardService],

  imports: [
    CommonModule,
    ManageSellerRoutingModule,
    ReactiveFormsModule,
    MatModule,
  ],
})
export class ManageSellerModule {}
