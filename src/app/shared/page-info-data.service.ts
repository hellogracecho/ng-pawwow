import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class PageInfoDataService {
  pages = [
    {
      title: "Home",
      url: "/home",
      icon: "home"
    },
    {
      title: "About",
      url: "/about",
      icon: "happy"
    },
    {
      title: "Our Staff",
      url: "/staff",
      icon: "people"
    },
    {
      title: "Our Services",
      url: "/services",
      icon: "leaf"
    },
    {
      title: "My Account",
      url: "/profile",
      icon: "person"
    }
  ];

  constructor() {}
}
