import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";

import { MapModalComponent } from "./map-modal/map-modal.component";
import { LoginButtonComponent } from "./login-button/login-button.component";

@NgModule({
  declarations: [MapModalComponent, LoginButtonComponent],
  imports: [CommonModule, IonicModule],
  exports: [MapModalComponent, LoginButtonComponent],
  entryComponents: [MapModalComponent]
})
export class SharedModule {}
