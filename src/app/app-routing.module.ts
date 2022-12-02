import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from "./auth/login/login.component";
import { AuthGuardService } from "./gaurds/auth.gaurd";
import { DefaultComponent } from "./layout/default/default.component";

const routes: Routes = [{ path: "auth", redirectTo: "/auth/login" }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
