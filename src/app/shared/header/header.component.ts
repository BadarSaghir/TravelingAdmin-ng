import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from "@angular/router";
// import { ProductService } from "src/app/services/location.service";
import { AuthService } from "../../services/firebase/auth.service";

@Component({
  selector: "app-header",
  templateUrl: "header.component.html",
  styleUrls: ["header.component.css"],
})
export class HeaderComponent implements OnInit {
  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  showSideBar = false;

  constructor(public auth: AuthService, private router: Router) {}
  public image = "/assets/images/dp.png";

  ngOnInit() {
    this.image = this.auth.user?.photoURL
      ? this.auth.user?.photoURL
      : "/assets/images/dp.png";
    // this.auth.authHandling();
    // this.auth.isLoggedIn;
    this.router.events.subscribe((res) => {
      console.log(this.router.url, "Current URL");
      if (this.router.url == "/auth/login" || this.router.url == "/auth") {
        this.showSideBar = false;
      } else {
        this.showSideBar = true;
      }
    });
  }

  toggleSideBar() {
    this.toggleSideBarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 300);
  }
}
