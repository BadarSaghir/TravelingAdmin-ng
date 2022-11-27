import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { AuthService } from "../services/firebase/auth.service";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  declarations: [LoginComponent],
  providers: [AuthService],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    NgxStarRatingModule,
    SharedModule,
  ],
})
export class AuthModule {}
