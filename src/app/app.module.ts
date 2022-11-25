import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { MatModule } from './shared/mat.module';
import { ChartsModule } from 'ng2-charts';
import { SharedModule } from './shared/shared.module';
import { MatDialogModule } from '@angular/material/dialog';
import { DefaultRoutingModule } from './layout/default/default-routing.module';
import { environment } from 'src/environments/environment';
// #####Firebase############3
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
// ##### side Nave modules #####
import { ManageSellerModule } from './Nav-Modules/manage-seller/manage-seller.module';
import { ManageProductModule } from './Nav-Modules/manage-product/manage-product.module';
import { ManageReviewModule } from './Nav-Modules/manage-review/manage-review.module';
import { ManageUserModule } from './Nav-Modules/manage-user/manage-user.module';
import { ManageLocationModule } from './Nav-Modules/manage-location/manage-location.module';
import { AuthModule } from './auth/auth.module';
import { DefaultModule } from "./layout/default/default.module";
import { AuthService } from "./services/firebase/auth.service";

@NgModule({
  declarations: [AppComponent, DashboardComponent],
  imports: [
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatModule,
    ChartsModule,
    SharedModule,
    MatDialogModule,
    DefaultRoutingModule,
    AuthModule,

    // ## side Nave modules ##
    ManageSellerModule,
    ManageProductModule,
    ManageReviewModule,
    ManageUserModule,
    ManageLocationModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
})
export class AppModule {}
