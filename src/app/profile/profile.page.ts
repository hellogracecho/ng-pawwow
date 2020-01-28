import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AuthService } from "../core/auth.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.page.html",
  styleUrls: ["./profile.page.scss"]
})
export class ProfilePage implements OnInit {
  constructor(public afAuth: AngularFireAuth, private auth: AuthService) {}

  ngOnInit() {}

  logout() {
    this.auth.logout();
  }
}
