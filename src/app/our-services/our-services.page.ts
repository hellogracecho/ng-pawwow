import { Component, OnInit } from "@angular/core";
import { AlertController } from "@ionic/angular";

@Component({
  selector: "app-our-services",
  templateUrl: "./our-services.page.html",
  styleUrls: ["./our-services.page.scss"]
})
export class OurServicesPage implements OnInit {
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

  constructor(private alertCtrl: AlertController) {}

  ngOnInit() {}

  onServiceCall() {
    this.alertCtrl
      .create({
        header: "Title",
        subHeader: "Sub-title",
        message: "Description...",
        buttons: [
          {
            text: "Cancel",
            role: "cancel",
            cssClass: "secondary",
            handler: blah => {
              console.log("Confirm Cancel: blah");
            }
          },
          {
            text: "Call",
            handler: () => {
              console.log("Confirm Okay");
            }
          }
        ]
      })
      .then(alertEl => alertEl.present());
  }
}
