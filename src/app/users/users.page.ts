import { Component, OnInit } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { Observable } from "rxjs";

import { UserProfile } from "../core/user-profile.model";
import { AuthService } from "../core/auth.service";

@Component({
  selector: "app-users",
  templateUrl: "./users.page.html",
  styleUrls: ["./users.page.scss"]
})
export class UsersPage implements OnInit {
  private usersCollection: AngularFirestoreCollection<UserProfile>;
  users: Observable<UserProfile[]>;

  constructor(private auth: AuthService, private afs: AngularFirestore) {
    this.usersCollection = afs.collection<UserProfile>("users");
    this.users = this.usersCollection.valueChanges();
  }

  ngOnInit() {}

  logout() {
    this.auth.logout();
  }
}
