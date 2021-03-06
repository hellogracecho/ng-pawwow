import { Component, OnInit } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { map, switchMap } from "rxjs/operators";
import { of } from "rxjs";

import { environment } from "../../environments/environment";
import { ModalController, ActionSheetController } from "@ionic/angular";
import { MapModalComponent } from "../shared/map-modal/map-modal.component";
import { EmailModalComponent } from "../shared/email-modal/email-modal.component";
import { PhoneFormatPipe } from "../shared/pipes/phone-format.pipe";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.page.html",
  styleUrls: ["./contact.page.scss"],
  providers: [PhoneFormatPipe]
})
export class ContactPage implements OnInit {
  selectedLocationImage: string;

  lat: number = 49.282508;
  lng: number = -123.108907;

  phoneNumber = "6040000000";
  emailAddress = "info@pawwow.ca";

  constructor(
    private http: HttpClient,
    private modalCtrl: ModalController,
    private actionSheetCtrl: ActionSheetController,
    private phoneFormat: PhoneFormatPipe
  ) {}

  ngOnInit() {
    this.getAddress(this.lat, this.lng)
      .pipe(
        switchMap(address => {
          return of(this.getMapImage(this.lat, this.lng, 14));
        })
      )
      .subscribe(MapImageUrl => {
        this.selectedLocationImage = MapImageUrl;
      });
  }

  // click - show modal to display the full map
  onShowFullMap() {
    this.modalCtrl
      .create({
        component: MapModalComponent
      })
      .then(modalEl => {
        modalEl.present();
      });
  }

  private getAddress(lat: number, lng: number) {
    return this.http
      .get<any>(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${environment.googleMapsAPIKey}`
      )
      .pipe(
        map(geoData => {
          // console.log(geoData);
          if (!geoData || !geoData.results || geoData.results.length === 0) {
            return null;
          }
          return geoData.results[0].formatted_address;
        })
      );
  }

  private getMapImage(lat: number, lng: number, zoom: number) {
    return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=500x300&maptype=roadmap
    &markers=color:red%7Clabel:PlaceS%7C${lat},${lng}
    &key=${environment.googleMapsAPIKey}`;
  }

  // Contact phone and email
  onContactCall() {
    this.actionSheetCtrl
      .create({
        buttons: [
          {
            text: "Call " + this.phoneFormat.transform(this.phoneNumber),
            // ** Reference: to use custom pipe in a component class
            // ** https://alligator.io/angular/using-pipes-in-component-class/
            handler: () => {
              window.open("tel:" + this.phoneNumber);
            }
          },
          {
            text: "Copy",
            handler: () => {
              this.copyToClipboard(this.phoneNumber);
            }
          },
          {
            text: "Cancel",
            role: "cancel",
            handler: () => {
              console.log("Cancel clicked");
            }
          }
        ]
      })
      .then(alertEl => alertEl.present());
  }

  onContactEmail() {
    this.actionSheetCtrl
      .create({
        buttons: [
          {
            text: "Email to " + this.emailAddress,
            handler: () => {
              // TODO idea 1. modal controller
              // this.modalCtrl
              //   .create({
              //     component: EmailModalComponent
              //   })
              //   .then(modalEl => {
              //     modalEl.present();
              //   });
              // TODO idea 2. simply... link to mailto: tag? like window.open("mailto:info@pawwow.ca") ?
              window.open("mailto:" + this.emailAddress);
            }
          },
          {
            text: "Copy",
            handler: () => {
              this.copyToClipboard(this.emailAddress);
            }
          },
          {
            text: "Cancel",
            role: "cancel",
            handler: () => {
              console.log("Cancel clicked");
            }
          }
        ]
      })
      .then(alertEl => alertEl.present());
  }

  // Async Clipboard API
  copyToClipboard(copyText) {
    navigator.clipboard.writeText(copyText).then(
      function() {
        console.log("Async: Copying to clipboard was successful!");
      },
      function(err) {
        console.error("Async: Could not copy text: ", err);
      }
    );
  }
}
