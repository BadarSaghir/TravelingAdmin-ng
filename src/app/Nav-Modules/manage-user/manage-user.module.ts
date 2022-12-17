import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ManageUserRoutingModule } from "./manage-user-routing.module";
import { ViewUserComponent } from './view-user/view-user.component';
import { MatModule } from 'src/app/shared/mat.module';
import { EmailValidatorDirective } from '../manage-user/email-validator.directive';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from "src/app/shared/shared.module";
import { AuthGuardService } from "src/app/gaurds/auth.gaurd";





@NgModule({
  declarations: [ViewUserComponent, EmailValidatorDirective],
  providers: [AuthGuardService],

  imports: [
    CommonModule,
    ManageUserRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    MatModule,
    HttpClientModule,
  ],
})
export class ManageUserModule {}
