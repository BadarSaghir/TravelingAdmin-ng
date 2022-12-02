import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgxStarRatingModule } from 'ngx-star-rating';
import { AuthService } from "../services/firebase/auth.service";
import { SharedModule } from "../shared/shared.module";
import { FireStoreService } from "../services/firebase/firestore.service";
import { FirebaseModule } from "../services/firebase/firebase.module";
import { AngularFireDatabase } from "@angular/fire/compat/database";
import { AuthGuardService } from "../gaurds/auth.gaurd";
import { LoginGuardService } from "../gaurds/login.gaurd";

@NgModule({
  declarations: [LoginComponent],
  providers: [
    AuthService,
    AuthGuardService,
    LoginGuardService,
    FireStoreService,
    AngularFireDatabase,
  ],
  imports: [
    FirebaseModule,
    CommonModule,
    AuthRoutingModule,

    ReactiveFormsModule,
    NgxStarRatingModule,
    SharedModule,
  ],
})
export class AuthModule {}
