import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";
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
  public image: SafeResourceUrl = environment.baseUrl + "/assets/images/dp.png";
  constructor(
    public auth: AuthService,
    private router: Router,
    private sanitize: DomSanitizer
  ) {}

  ngOnInit() {
    const img = localStorage.getItem("img");

    if (img) console.log("img", img);

    this.image = img
      ? this.sanitize.bypassSecurityTrustResourceUrl(img)
      : environment.baseUrl + "/assets/images/dp.png";

    // this.image = this.auth.user?.photoURL
    //   ? this.auth.user?.photoURL
    //   : environment.baseUrl + "/assets/images/dp.png";
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
