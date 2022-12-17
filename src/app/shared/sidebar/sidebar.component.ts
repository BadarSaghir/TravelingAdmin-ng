import { Component, OnInit } from '@angular/core';
import { AuthService } from "src/app/services/firebase/auth.service";
import { environment } from "src/environments/environment";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { AngularFireStorage } from "@angular/fire/compat/storage";
// import { AuthService } from "src/app/services/firebase/user.service";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.css"],
})
export class SidebarComponent {
  public image: string | SafeResourceUrl =
    environment.baseUrl + "/assets/images/dp.png";
  constructor(
    public auth: AuthService,
    private sanitize: DomSanitizer,
    private st: AngularFireStorage
  ) {
    const img = localStorage.getItem("img");

    if (img) console.log("img", img);

    this.image = img
      ? this.sanitize.bypassSecurityTrustResourceUrl(img)
      : environment.baseUrl + "/assets/images/dp.png";
  }
  getImg(imgSrcRaw: string) {
    let ref = this.st.ref(imgSrcRaw);
    return ref.getDownloadURL();
  }

  ngOnInit(): void {}
}
