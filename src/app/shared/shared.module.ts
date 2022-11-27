import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatModule } from './mat.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AuthService } from "../services/firebase/auth.service";
import { CardCounterComponent } from "./card-counter/card-counter.component";
import { FireStoreService } from "../services/firebase/firestore.service";
@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    CardCounterComponent,
  ],
  imports: [CommonModule, SharedRoutingModule, MatModule, FlexLayoutModule],
  providers: [AuthService, FireStoreService],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    CardCounterComponent,
  ],
})
export class SharedModule {}
