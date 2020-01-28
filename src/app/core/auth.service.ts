import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";
import { UserProfile } from "./user-profile.model";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) {}

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate([""]);
  }

  isLoggedIn() {
    return !!this.afAuth.auth.currentUser;
  }

  createUserDocument() {
    // get the current user
    const user = this.afAuth.auth.currentUser;

    // create the object with new data
    const userProfile: UserProfile = {
      uid: user.uid,
      name: user.displayName,
      email: user.email,
      phone: ""
    };

    // write to Cloud Firestore
    return this.afs.doc(`users/${user.uid}`).set(userProfile);
  }

  updateUserDocument(userProfile: UserProfile) {
    return this.afs.doc(`users/${userProfile.uid}`).update(userProfile);
  }

  async routeOnLogin() {
    const user = this.afAuth.auth.currentUser;
    const token = await user.getIdTokenResult();

    this.router.navigate([`/profile/${user.uid}`]);
    console.log("router works!");
    // if (token.claims.admin) {
    //   this.router.navigate(["/users"]);
    // } else {
    //   this.router.navigate([`/profile/${user.uid}`]);
    // }
  }
}
