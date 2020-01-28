import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { LoginComponent } from "./login/login.component";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  {
    path: "auth",
    component: LoginComponent
  },
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
    path: "profile/:id",
    loadChildren: () =>
      import("./profile/profile.module").then(m => m.ProfilePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
