import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

import { ModalController, LoadingController } from "@ionic/angular";

@Component({
  selector: "app-email-modal",
  templateUrl: "./email-modal.component.html",
  styleUrls: ["./email-modal.component.scss"]
})
export class EmailModalComponent implements OnInit {
  error: string;
  isLoading = false;

  constructor(
    private modalCtrl: ModalController,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {}

  onCancel() {
    this.modalCtrl.dismiss();
  }

  // TODO: Modal Controller to write a email to "info@pawwow.ca" with the user's email

  async onSubmit(ngForm: NgForm) {
    this.error = null;
    this.isLoading = true;

    try {
      if (ngForm.valid) {
        this.loadingCtrl
          .create({
            keyboardClose: true,
            message: "Updating your profile.",
            spinner: "circles"
          })
          .then(loadingEl => {
            loadingEl.present();
            // Add Loader
            setTimeout(() => {
              this.isLoading = false;
              loadingEl.dismiss();
              // this.auth.routeOnLogin();
            }, 1000);
          });
      } else {
        console.log("invalid form");
        return;
      }
    } catch (error) {
      // TODO: this catch error not working..
      console.log("invalid form");
      console.log(error.message);
      this.error = error.message;
    }
  }
}
