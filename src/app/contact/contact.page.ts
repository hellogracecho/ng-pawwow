import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";

import { map, switchMap } from "rxjs/operators";
import { of } from "rxjs";

import { environment } from "../../environments/environment";
import { ModalController } from "@ionic/angular";
import { MapModalComponent } from "../shared/map-modal/map-modal.component";

@Component({
  selector: 'app-contact',
  templateUrl: './contact.page.html',
  styleUrls: ['./contact.page.scss'],
})
export class ContactPage implements OnInit {
  selectedLocationImage: string;

  lat: number = 49.282508;
  lng: number = -123.108907;

  constructor(private http: HttpClient, private modalCtrl: ModalController) { }

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
        // componentProps: {
        //   center: {
        //     lat: this.lat,
        //     lng: this.lng
        //   },
        //   selectable: false,
        //   closeButtonText: "Close",
        //   title: "Our Location"
        // }
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
}
