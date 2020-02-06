import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";

import { LoginButtonComponent } from "./login-button/login-button.component";
import { MapModalComponent } from "./map-modal/map-modal.component";
import { EmailModalComponent } from "./email-modal/email-modal.component";

@NgModule({
  declarations: [MapModalComponent, LoginButtonComponent, EmailModalComponent],
  imports: [CommonModule, IonicModule],
  exports: [MapModalComponent, LoginButtonComponent, EmailModalComponent],
  entryComponents: [MapModalComponent, EmailModalComponent]
})
export class SharedModule {}
