import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NgForm } from "@angular/forms";
import {
  AngularFirestoreDocument,
  AngularFirestore
} from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFireStorage } from "@angular/fire/storage";
import { Observable } from "rxjs";
import { finalize } from "rxjs/operators";

import { LoadingController, Platform } from "@ionic/angular";

import {
  Capacitor,
  Plugins,
  CameraSource,
  CameraResultType
} from "@capacitor/core";

import { AuthService } from "../services/auth.service";
import { UserProfile } from "../services/user-profile.model";

// This function converts a string to a file
function base64toBlob(base64Data, contentType) {
  contentType = contentType || "";
  const sliceSize = 1024;
  const byteCharacters = atob(base64Data);
  const bytesLength = byteCharacters.length;
  const slicesCount = Math.ceil(bytesLength / sliceSize);
  const byteArrays = new Array(slicesCount);

  for (var sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    const begin = sliceIndex * sliceSize;
    const end = Math.min(begin + sliceSize, bytesLength);

    const bytes = new Array(end - begin);
    for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0);
    }
    byteArrays[sliceIndex] = new Uint8Array(bytes);
  }
  return new Blob(byteArrays, { type: contentType });
}

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"]
})

// TODO: FormControl, Validator
// https://www.joshmorony.com/advanced-forms-validation-in-ionic-2/
export class ProfilePage implements OnInit {
  @ViewChild("filePicker", { static: false }) filePickerRef: ElementRef<
    HTMLInputElement
  >;
  // Reference for the document
  private itemDoc: AngularFirestoreDocument<UserProfile>;
  item: Observable<UserProfile>;
  uid: string;
  error: string;
  // Upload photo and show the progress bar
  downloadURL: Observable<string>;
  currentDownloadURL: Observable<string>;
  uploadProgress: Observable<number>;
  isLoading = false;
  isUpdated = false;
  usePicker = false;

  constructor(
    public afAuth: AngularFireAuth,
    private auth: AuthService,
    private afs: AngularFirestore,
    private route: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private afStorage: AngularFireStorage,
    private platform: Platform
  ) {
    this.uid = this.route.snapshot.paramMap.get("id");
    this.downloadURL = this.afStorage
      .ref(`users/${this.uid}/profile-image`)
      .getDownloadURL();
    // Detecting the platform
    console.log("Mobile:", this.platform.is("mobile"));
    console.log("Hybrid:", this.platform.is("hybrid"));
    console.log("iOS:", this.platform.is("ios"));
    console.log("Android:", this.platform.is("android"));
    console.log("Desktop:", this.platform.is("desktop"));
    if (
      (this.platform.is("mobile") && !this.platform.is("hybrid")) ||
      this.platform.is("desktop")
    ) {
      this.usePicker = true;
    }
  }

  ngOnInit() {
    this.itemDoc = this.afs.doc<UserProfile>(`users/${this.uid}`);
    this.item = this.itemDoc.valueChanges();
  }

  logout() {
    this.auth.logout();
  }

  // 1. Open Camera
  onPickImage() {
    if (!Capacitor.isPluginAvailable("Camera")) {
      // Camera plugins not available
      this.filePickerRef.nativeElement.click();
      return;
    }
    Plugins.Camera.getPhoto({
      quality: 50,
      source: CameraSource.Camera,
      correctOrientation: true,
      width: 300,
      resultType: CameraResultType.Base64
    })
      .then(image => {
        const imagePicked = image.base64String;
        let imageFile;
        if (typeof imagePicked === "string") {
          try {
            imageFile = base64toBlob(
              imagePicked.replace("data:image/jpeg;base64,", ""),
              "image/jpeg"
            );
            this.downloadURL = imageFile;
          } catch (error) {
            console.log(error);
            return;
          }
        } else {
          imageFile = imagePicked;
          this.downloadURL = imageFile;
        }
        console.log(imageFile);
      })
      .catch(error => {
        console.log(error);
        // Catch error
        if (this.usePicker) {
          this.filePickerRef.nativeElement.click();
        }
        return false;
      });
  }

  // 2. File Pick and Choose
  onFileChosen(event) {
    this.isLoading = true;
    this.isUpdated = true;
    this.error = null;

    if (this.downloadURL) {
      // Temporarily save the current image until it is updated
      this.currentDownloadURL = this.downloadURL;
    }

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
    this.isLoading = false;
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
      // console.log(error.message);
      this.error = error.message;
    }
  }
}
