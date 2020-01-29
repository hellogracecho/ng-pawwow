import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { NgForm } from "@angular/forms";

import {
  AngularFirestoreDocument,
  AngularFirestoreModule,
  AngularFirestore
} from "@angular/fire/firestore";
import { AngularFireAuth } from "@angular/fire/auth";

import { AuthService } from "../core/auth.service";
import { UserProfile } from "../core/user-profile.model";
import { Observable } from "rxjs";

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

  error: string;

  constructor(
    public afAuth: AngularFireAuth,
    private auth: AuthService,
    private afs: AngularFirestore,
    private route: ActivatedRoute
  ) {
    this.uid = this.route.snapshot.paramMap.get("id");

    // this.downloadURL = this.afStorage
    //   .ref(`users/${this.uid}/profile-image`)
    //   .getDownloadURL();
  }

  ngOnInit() {
    this.itemDoc = this.afs.doc<UserProfile>(`users/${this.uid}`);
    this.item = this.itemDoc.valueChanges();
  }

  logout() {
    this.auth.logout();
  }

  async onSubmit(ngForm: NgForm) {
    const {
      name,
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
      name,
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
      await this.auth.updateUserDocument(userProfile);
    } catch (error) {
      console.log(error.message);
      this.error = error.message;
    }
  }
}
