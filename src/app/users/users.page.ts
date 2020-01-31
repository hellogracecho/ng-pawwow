import { Component, OnInit } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { Observable } from "rxjs";

import { UserProfile } from "../core/user-profile.model";
import { AuthService } from "../core/auth.service";
import { LoadingController } from "@ionic/angular";

@Component({
  selector: "app-users",
  templateUrl: "./users.page.html",
  styleUrls: ["./users.page.scss"]
})
export class UsersPage implements OnInit {
  private usersCollection: AngularFirestoreCollection<UserProfile>;
  users: Observable<UserProfile[]>;
  isLoading = false;
  error: string;
  isUser = false;

  constructor(
    private auth: AuthService,
    private afs: AngularFirestore,
    private loadingCtrl: LoadingController
  ) {
    this.usersCollection = afs.collection<UserProfile>("users");
    this.users = this.usersCollection.valueChanges();
  }

  ngOnInit() {
    this.isLoading = true;
    // does user exist ?
    this.users.subscribe(val => {
      if (val.length > 0) {
        return (this.isUser = true);
      } else {
        return (this.isUser = false);
      }
    });
    setTimeout(() => {
      this.isLoading = false;
    }, 2000);
  }

  logout() {
    this.auth.logout();
  }
}
