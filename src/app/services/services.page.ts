import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-services",
  templateUrl: "./services.page.html",
  styleUrls: ["./services.page.scss"]
})
export class ServicesPage implements OnInit {
  services = [
    {
      title: "Dog Waliking",
      subtitle: `With expert dog walkers, your dogs will feel much energized.`,
      imageURL: "/assets/dog-walking.jpg"
    },
    {
      title: "Grooming",
      subtitle: `We offer an organic alternative to pet grooming, healthy choice for your pet, yourself, and earth.`,
      imageURL: "/assets/grooming.jpg"
    },
    {
      title: "Training",
      subtitle: `With our expert trainers, your pet will have a fun.`,
      imageURL: "/assets/dog-training.jpg"
    },
    {
      title: "Boarding",
      subtitle: `We guarantee your pet have a fun staycation with us.`,
      imageURL: "/assets/boarding.jpg"
    },
    {
      title: "Day Care",
      subtitle: `The ultimate and private day care.`,
      imageURL: "/assets/dog-day-care.jpg"
    }
  ];

  constructor() {}

  ngOnInit() {}
}
