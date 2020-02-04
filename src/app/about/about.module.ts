import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { IonicModule } from "@ionic/angular";

import { AboutPageRoutingModule } from "./about-routing.module";

import { AboutPage } from "./about.page";
import { MapModalComponent } from "../shared/map-modal/map-modal.component";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, AboutPageRoutingModule],
  declarations: [AboutPage, MapModalComponent],
  entryComponents: [MapModalComponent]
})
export class AboutPageModule {}
