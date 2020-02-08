import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IonicModule } from "@ionic/angular";

import { LoginButtonComponent } from "./login-button/login-button.component";
import { MapModalComponent } from "./map-modal/map-modal.component";
import { EmailModalComponent } from "./email-modal/email-modal.component";
import { PhoneFormatPipe } from "./pipes/phone-format.pipe";

@NgModule({
  declarations: [
    MapModalComponent,
    LoginButtonComponent,
    EmailModalComponent,
    PhoneFormatPipe
  ],
  imports: [CommonModule, IonicModule],
  exports: [
    MapModalComponent,
    LoginButtonComponent,
    EmailModalComponent,
    PhoneFormatPipe
  ],
  entryComponents: [MapModalComponent, EmailModalComponent]
})
export class SharedModule {}

// ** PIPES in ./shared/pipes/myCustomOne.pipe
// ** Reference https://stackoverflow.com/questions/45098278/angular-custom-pipe-not-be-found
