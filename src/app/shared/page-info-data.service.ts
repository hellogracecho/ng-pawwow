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
      title: "About Us",
      url: "/about",
      icon: "happy"
    },
    {
      title: "Our Services",
      url: "/services",
      icon: "paw"
    },
    {
      title: "Contact Us",
      url: "/contact",
      icon: "chatboxes"
    },
    {
      title: "My Account",
      url: "/profile",
      icon: "person"
    }
  ];

  constructor() {}
}
