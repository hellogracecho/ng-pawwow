import { Component } from "@angular/core";

import { PageInfoDataService } from "../shared/page-info-data.service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  pages = [];

  constructor(private pageInfoData: PageInfoDataService) {
    this.pages = this.pageInfoData.pages.slice(1);
  }
}
