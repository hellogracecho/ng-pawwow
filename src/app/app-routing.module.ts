import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo
} from "@angular/fire/auth-guard";
import { map } from "rxjs/operators";

// Custom Pipes
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(["auth"]);
const redirectLoggedInToProfile = () =>
  map(user => (user ? ["profile", (user as any).uid] : true));
const onlyAllowSelf = next =>
  map(user => (!!user && next.params.id == (user as any).uid) || ["auth"]);

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  {
    path: "home",
    loadChildren: () => import("./home/home.module").then(m => m.HomePageModule)
  },
  {
    path: "about",
    loadChildren: () =>
      import("./about/about.module").then(m => m.AboutPageModule)
  },
  {
    path: "staff",
    loadChildren: () =>
      import("./staff/staff.module").then(m => m.StaffPageModule)
  },
  {
    path: "services",
    loadChildren: () =>
      import("./services/services.module").then(m => m.ServicesPageModule)
  },
  {
    path: "auth",
    component: LoginComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToProfile }
  },
  {
    path: "profile/:id",
    loadChildren: () =>
      import("./profile/profile.module").then(m => m.ProfilePageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: onlyAllowSelf }
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
