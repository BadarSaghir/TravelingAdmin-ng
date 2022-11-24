import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DefaultRoutingModule } from './default-routing.module';
import { DefaultComponent } from './default.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { MatModule } from 'src/app/shared/mat.module';

@NgModule({
  declarations: [
    DefaultComponent
  ],
  imports: [
    CommonModule,
    DefaultRoutingModule,
    SharedModule,
    MatModule,
  ],
  exports :[
    DefaultComponent
  ]
})
export class DefaultModule { }
