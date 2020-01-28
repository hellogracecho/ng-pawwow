import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../core/auth.service";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  loading = false;
  error: string;
  action: "login" | "register" = "login";

  constructor(
    private auth: AuthService,
    private router: Router,
    private afAuth: AngularFireAuth
  ) {}

  ngOnInit() {}

  async onSubmit(form: NgForm) {
    this.loading = true;
    this.error = null;

    const { firstName, lastName, email, password } = form.value;

    let resp;

    try {
      if (this.isSignUp) {
        resp = await this.afAuth.auth.createUserWithEmailAndPassword(
          email,
          password
        );
        form.reset();
        // TODO: not sure the following lines work..
        this.auth.routeOnLogin();
        await resp.user.updateProfile({
          displayName: `${firstName} ${lastName}`
        });
        await this.auth.createUserDocument();
      } else {
        resp = await this.afAuth.auth.signInWithEmailAndPassword(
          email,
          password
        );
      }

      this.auth.routeOnLogin();
    } catch (error) {
      console.log(error.message);
      this.error = error.message;
    }
    this.loading = false;
  }

  get isLogin() {
    return this.action === "login";
  }

  get isSignUp() {
    return this.action === "register";
  }
}
