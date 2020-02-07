import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { LoadingController } from "@ionic/angular";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"]
})
export class LoginComponent implements OnInit {
  error: string;
  action: "login" | "register" = "login";
  isLoading = false;

  constructor(
    private auth: AuthService,
    private router: Router,
    private afAuth: AngularFireAuth,
    private loadingCtrl: LoadingController
  ) {}

  ngOnInit() {
    this.action = "login";
  }

  async onSubmit(form: NgForm) {
    this.error = null;
    this.isLoading = true;

    const { firstName, lastName, email, password } = form.value;
    let resp;

    try {
      if (this.isSignUp) {
        if (form.valid) {
          this.loadingCtrl
            .create({
              keyboardClose: true,
              message: "Registering...",
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
        }
        resp = await this.afAuth.auth.createUserWithEmailAndPassword(
          email,
          password
        );
        await resp.user.updateProfile({
          displayName: `${firstName} ${lastName}`
        });
        await this.auth.createUserDocument(firstName, lastName);
      } else {
        if (form.valid) {
          this.loadingCtrl
            .create({
              keyboardClose: true,
              message: "Signing in...",
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
        }
        resp = await this.afAuth.auth.signInWithEmailAndPassword(
          email,
          password
        );
      }
      form.reset();
      this.auth.routeOnLogin();
    } catch (error) {
      // console.log(error.message);
      this.error = error.message;
    }
  }

  get isLogin() {
    return this.action === "login";
  }

  get isSignUp() {
    return this.action === "register";
  }
}
