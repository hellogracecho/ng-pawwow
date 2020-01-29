import { Component } from "@angular/core";

import { AngularFireAuth } from "@angular/fire/auth";

import { PageInfoDataService } from "../core/page-info-data.service";
import { AuthService } from "../core/auth.service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  pages = [];

  constructor(
    private pageInfoData: PageInfoDataService,
    private auth: AuthService,
    private afAuth: AngularFireAuth
  ) {
    this.pages = this.pageInfoData.pages.slice(1);
  }

  onProfile() {
    this.auth.routeOnLogin();
  }

  onLogin() {
    this.auth.login();
  }
}
