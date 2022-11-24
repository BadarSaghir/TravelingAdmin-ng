import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.css"],
})
export class HeaderComponent implements OnInit {
  @Output() toggleSideBarForMe: EventEmitter<any> = new EventEmitter();
  showSideBar = false;

  constructor(private router: Router) {
    this.router.events.subscribe((res) => {
      console.log(this.router.url, "Current URL");
      if (this.router.url == "/auth/login" || this.router.url == "/auth") {
        this.showSideBar = false;
      } else {
        this.showSideBar = true;
      }
    });
  }

  ngOnInit() {}

  toggleSideBar() {
    this.toggleSideBarForMe.emit();
    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 300);
  }
}
