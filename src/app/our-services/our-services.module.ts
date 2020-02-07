import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { Ng2SearchPipeModule } from "ng2-search-filter";

import { ServicesPageRoutingModule } from "./our-services-routing.module";
import { OurServicesPage } from "./our-services.page";
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
  declarations: [OurServicesPage]
})
export class ServicesPageModule {}
