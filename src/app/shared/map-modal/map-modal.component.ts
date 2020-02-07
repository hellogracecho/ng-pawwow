import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  Input,
  Renderer2
} from "@angular/core";
import { ModalController } from "@ionic/angular";

import { environment } from "../../../environments/environment";

@Component({
  selector: "app-map-modal",
  templateUrl: "./map-modal.component.html",
  styleUrls: ["./map-modal.component.scss"]
})
export class MapModalComponent implements OnInit {
  @ViewChild("map", { static: false }) mapElementRef: ElementRef;
  googleMaps: any;
  @Input() center = { lat: 49.282508, lng: -123.108907 };

  constructor(
    private modalCtrl: ModalController,
    private renderer: Renderer2
  ) {}

  ngOnInit() {}

  onCancel() {
    this.modalCtrl.dismiss();
  }

  getDirection() {
    window.open(
      "https://www.google.com/maps/dir/49.2827125,-123.109105/151+W+Hastings+St,+Vancouver,+BC/@49.2826597,-123.111343,17z/data=!3m1!4b1!4m10!4m9!1m1!4e1!1m5!1m1!1s0x5486717994206c61:0x5625c9f83d97c055!2m2!1d-123.1088027!2d49.282578!3e3"
    );
  }

  ngAfterViewInit() {
    this.getGoogleMaps()
      .then(googleMaps => {
        this.googleMaps = googleMaps;
        const mapEl = this.mapElementRef.nativeElement;
        const map = new googleMaps.Map(mapEl, {
          center: this.center,
          zoom: 13
        });

        this.googleMaps.event.addListenerOnce(map, "idle", () => {
          this.renderer.addClass(mapEl, "visible");
        });

        const marker = new googleMaps.Marker({
          position: this.center,
          map: map
        });
        marker.setMap(map);
      })
      .catch(err => {
        console.log(err);
      });
  }

  // Inject Google Maps SDK
  private getGoogleMaps(): Promise<any> {
    const win = window as any;
    // window referes global an entire browser.
    const googleModule = win.google;
    if (googleModule && googleModule.maps) {
      return Promise.resolve(googleModule.maps);
    }
    return new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src =
        "https://maps.googleapis.com/maps/api/js?key=" +
        environment.googleMapsAPIKey +
        "&callback=initMap";
      script.async = true;
      script.defer = true;
      document.body.appendChild(script);
      script.onload = () => {
        const loadingGoogleModule = win.google;
        if (loadingGoogleModule && loadingGoogleModule.maps) {
          resolve(loadingGoogleModule.maps);
        } else {
          reject("Google Maps SDK not available");
        }
      };
    });
  }
}
