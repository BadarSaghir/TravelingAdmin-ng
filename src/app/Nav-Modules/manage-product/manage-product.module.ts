import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageProductRoutingModule } from './manage-product-routing.module';
import { AddProductComponent } from './add-product/add-product.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatModule } from 'src/app/shared/mat.module';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from "@angular/fire/compat";
import { AuthGuardService } from "src/app/gaurds/auth.gaurd";
import { DialogueProductComponent } from "./view-product/product-dialogue/product-dialogue.component";


@NgModule({
  declarations: [
    AddProductComponent,
    ViewProductComponent,
    DialogueProductComponent,
  ],
  providers: [AuthGuardService],

  imports: [
    CommonModule,
    ManageProductRoutingModule,
    ReactiveFormsModule,
    MatModule,
    HttpClientModule,
    AngularFireModule,
  ],
})
export class ManageProductModule {}
