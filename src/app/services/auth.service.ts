import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { UserProfile } from "./user-profile.model";
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore } from "@angular/fire/firestore";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore
  ) {}

  login() {
    this.router.navigate(["auth"]);
  }

  logout() {
    this.afAuth.auth.signOut();
    this.router.navigate(["auth"]);
  }

  isLoggedIn() {
    // TODO /home page refresh... not catching the fireauth right awaw.
    // console.log(this.afAuth.auth.currentUser);
    // console.log(!!this.afAuth.auth.currentUser);
    return !!this.afAuth.auth.currentUser;
  }

  createUserDocument(firstname, lastname) {
    // get the current user
    const user = this.afAuth.auth.currentUser;

    // create the object with new data
    const userProfile: UserProfile = {
      uid: user.uid,
      firstName: firstname,
      lastName: lastname,
      email: user.email,
      phone: "",
      address: "",
      city: "",
      province: "",
      zip: "",
      petName: "",
      petAge: null,
      petDescription: ""
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

    // Go to profile page
    this.router.navigate([`/profile/${user.uid}`]);
    if (token.claims.admin) {
      this.router.navigate(["/users"]);
    } else {
      this.router.navigate([`/profile/${user.uid}`]);
    }
  }
}
