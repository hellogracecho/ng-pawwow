import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NgForm } from "@angular/forms";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";

import { LoadingController } from "@ionic/angular";

import {
  AngularFirestoreDocument,
  AngularFirestoreModule,
  AngularFirestore
} from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireStorage } from "@angular/fire/storage";

import { AuthService } from "../services/auth.service";
import { UserProfile } from "../services/user-profile.model";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"]
})
export class ProfilePage implements OnInit {
  // Reference for the document
  private itemDoc: AngularFirestoreDocument<UserProfile>;
  item: Observable<UserProfile>;
  uid: string;

  // TODO: FormControl, Validator
  // https://www.joshmorony.com/advanced-forms-validation-in-ionic-2/

  error: string;
  isLoading = false;

  // Upload photo and show the progress bar
  downloadURL: Observable<string>;
  uploadProgress: Observable<number>;

  constructor(
    public afAuth: AngularFireAuth,
    private auth: AuthService,
    private afs: AngularFirestore,
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private afStorage: AngularFireStorage
  ) {
    this.uid = this.route.snapshot.paramMap.get("id");
    this.downloadURL = this.afStorage
      .ref(`users/${this.uid}/profile-image`)
      .getDownloadURL();
    console.log(this.downloadURL);
  }

  ngOnInit() {
    this.itemDoc = this.afs.doc<UserProfile>(`users/${this.uid}`);
    this.item = this.itemDoc.valueChanges();
  }

  logout() {
    this.auth.logout();
  }

  async onSubmit(ngForm: NgForm) {
    this.error = null;
    this.isLoading = true;

    const {
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      province,
      zip,
      petName,
      petAge,
      petDescription
    } = ngForm.form.getRawValue();

    const userProfile: UserProfile = {
      uid: this.uid,
      firstName,
      lastName,
      email,
      phone,
      address,
      city,
      province,
      zip,
      petName,
      petAge,
      petDescription
    };

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
        this.error = "Please fill out the form.";
        return;
      }
      await this.auth.updateUserDocument(userProfile);
    } catch (error) {
      // TODO: this catch error not working..
      console.log("invalid form");
      console.log(error.message);
      this.error = error.message;
    }
  }

  fileChange(event) {
    // ** When "cancel to upload", it still needs to display the current picture, so it can not return null.
    // TODO: When updated, it displays the placeholder for a second while the URL is re-created..
    // TODO isLoading...
    // this.downloadURL = null;
    this.error = null;

    // get the file
    const file = event.target.files[0];

    // create the file refrence
    const filePath = `users/${this.uid}/profile-image`;
    const fileRef = this.afStorage.ref(filePath);

    // upload and store the task
    const task = this.afStorage.upload(filePath, file);
    task.catch(error => (this.error = error.message));

    // observer percentage changes
    this.uploadProgress = task.percentageChanges();

    // get notified when the download URL is avaialbe
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.downloadURL = fileRef.getDownloadURL();
        })
      )
      .subscribe();
  }
}
