import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { Ng2SearchPipeModule } from "ng2-search-filter";

import { ServicesPageRoutingModule } from "./services-routing.module";
import { ServicesPage } from "./services.page";
import { SharedModule } from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ServicesPageRoutingModule,
    SharedModule,
    Ng2SearchPipeModule
  ],
  declarations: [ServicesPage]
})
export class ServicesPageModule {}
