import { Component, OnInit } from "@angular/core";
import { AuthService } from "../core/auth.service";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestoreDocument, AngularFirestoreModule, AngularFirestore } from "@angular/fire/firestore";
import { Observable } from 'rxjs';
import { UserProfile } from '../core/user-profile.model';
import { ActivatedRoute } from '@angular/router';


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
  
  constructor(public afAuth: AngularFireAuth, private auth: AuthService, private afs: AngularFirestore ,private route: ActivatedRoute) {
    this.uid = this.route.snapshot.paramMap.get('id');

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
}
