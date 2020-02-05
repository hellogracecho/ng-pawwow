import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo,
  customClaims
} from "@angular/fire/auth-guard";
import { pipe } from "rxjs";
import { map } from "rxjs/operators";

// Custom Pipes
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(["auth"]);
const redirectLoggedInToProfile = () =>
  map(user => (user ? ["profile", (user as any).uid] : true));
const onlyAllowSelf = next =>
  map(user => (!!user && next.params.id == (user as any).uid) || ["auth"]);

const adminOnly = () =>
  pipe(
    customClaims,
    map(claims => claims.admin === true || [""])
  );

const redirectLoggedInToProfileOrUsers = () =>
  pipe(
    customClaims,
    map(claims => {
      // if no claims, then there is no authenticated user
      // so alow the route ['']
      if (claims.length === 0) {
        return true;
      }

      // if a custom claim set, then redirect to ['users']
      if (claims.admin) {
        return ["users"];
      }

      // otherwise, redirect user's profile page
      return ["profile", claims.user_id];
    })
  );

const allowOnlySelfOrAdmin = next =>
  pipe(
    customClaims,
    map(claims => {
      if ((claims.length = 0)) {
        return [""];
      }

      return next.params.id === claims.user_id || claims.admin;
    })
  );

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
    path: "services",
    loadChildren: () =>
      import("./services/services.module").then(m => m.ServicesPageModule)
  },
  {
    path: "auth",
    component: LoginComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToProfileOrUsers }
  },
  {
    path: "profile",
    component: LoginComponent,
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: redirectLoggedInToProfileOrUsers }
  },
  {
    path: "profile/:id",
    loadChildren: () =>
      import("./profile/profile.module").then(m => m.ProfilePageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: allowOnlySelfOrAdmin }
  },
  {
    path: "users",
    loadChildren: () =>
      import("./users/users.module").then(m => m.UsersPageModule),
    canActivate: [AngularFireAuthGuard],
    data: { authGuardPipe: adminOnly }
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact/contact.module').then( m => m.ContactPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
