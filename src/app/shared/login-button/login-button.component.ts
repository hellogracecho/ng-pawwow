import { Component, OnInit } from "@angular/core";
import { AuthService } from "src/app/services/auth.service";

@Component({
  selector: "app-login-button",
  templateUrl: "./login-button.component.html",
  styleUrls: ["./login-button.component.scss"]
})
export class LoginButtonComponent implements OnInit {
  constructor(private auth: AuthService) {}

  ngOnInit() {}

  onProfile() {
    this.auth.routeOnLogin();
  }

  onLogin() {
    this.auth.login();
  }
}
