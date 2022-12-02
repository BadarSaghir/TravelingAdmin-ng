import { Component, OnInit } from '@angular/core';
import { AuthService } from "src/app/services/firebase/auth.service";
// import { AuthService } from "src/app/services/firebase/user.service";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent {
  public image = "../assets/images/dp.png";
  constructor(public auth: AuthService) {
    this.image = this.auth.user?.photoURL
      ? this.auth.user?.photoURL
      : "../assets/images/dp.png";
  }

  ngOnInit(): void {}
}
