import { Component } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { environment } from "src/environments/environment";
import { LocationService } from "./services/location.service";
import { ManageSellerService } from "./services/manage-seller.service";
import { UserService } from "./services/user.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  title = "preparely";
  showSideBar = true;

  sideBarOpen = true;

  constructor(
    private router: Router,
    private userService: UserService,
    private sellerService: ManageSellerService,
    private placeSerice: LocationService
  ) {
    // router.events.subscribe((event: Event) => {
    //   console.log(event);
    //   if (event instanceof NavigationEnd) {
    //     this.currentUrl = event.url;
    //   }
    // });
  }

  ngOnInit() {
    this.router.events.subscribe((res) => {
      console.log(this.router.url, "Current URL");
      if (this.router.url == "/auth/login" || this.router.url == "/auth") {
        this.showSideBar = false;
      } else {
        this.userService.setDataInTable();
        this.sellerService.setDataInTable();
        this.placeSerice.setDataInTable();
        this.showSideBar = true;
      }
    });
  }

  sideBarToggler() {
    this.sideBarOpen = !this.sideBarOpen;
  }
}
