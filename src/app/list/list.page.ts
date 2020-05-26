import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';

@Component({
  selector: "app-list",
  templateUrl: "list.page.html",
  styleUrls: ["list.page.scss"],
})
export class ListPage implements OnInit {
  private icons = [
    "flask",
    "wifi",
    "beer",
    "football",
    "basketball",
    "paper-plane",
    "american-football",
    "boat",
    "bluetooth",
    "build",
  ];
  temp = [];
  public items = [
    {
      id: this.getRandomInt(10123123, 1),
      name: "bache",
      status: "RESOLVED",
      priority: this.getRandomInt(4, 1),
      description: "Es un bache bien cabron que lleva varios dias asi",
      lat: 25.7753341,
      lng: -109.0192314,
    },
    {
      id: this.getRandomInt(10123123, 1),
      name: "Señal de stop rayada",
      status: "RESOLVED",
      description: "unos cholos lo hicieron hace tiempo",
      priority: this.getRandomInt(4, 1),
      lat: 25.7582117,
      lng: -108.9833722,
    },
    {
      id: this.getRandomInt(10123123, 1),
      name: "la calle esta del asco",
      status: "ATTENDED",
      description: "arreglen esto que ya tienen mucho ",
      priority: this.getRandomInt(4, 1),
      lat: 25.7582117,
      lng: -108.9833722,
    },
    {
      id: this.getRandomInt(10123123, 1),
      name: "la calle esta del asco",
      status: "ATTENDED",
      description: "arreglen esto que ya tienen mucho ",
      priority: this.getRandomInt(4, 1),
      lat: 25.7582117,
      lng: -108.9833722,
    },
    {
      id: this.getRandomInt(10123123, 1),
      name: "la calle esta del asco",
      status: "ATTENDED",
      description: "arreglen esto que ya tienen mucho ",
      priority: this.getRandomInt(4, 1),
      lat: 25.7582117,
      lng: -108.9833722,
    },
    {
      id: this.getRandomInt(10123123, 1),
      name: "Boulevart mal pavimentado ",
      status: "CREATED",
      description:
        "Hace dias realizaron unas actividades a las palmas y los mismos trabajadores dejaron huecos en el boulevart",
      priority: this.getRandomInt(4, 1),
      lat: 25.7582117,
      lng: -108.9833722,
    },
  ];
  constructor(public DataService: AuthService) {}

  ngOnInit() {}
  show() {
    console.log("hola");
  }
  doRefresh(event) {
    console.log("Begin async operation");

    setTimeout(() => {
      console.log("Async operation has ended");
      event.target.complete();
    }, 2000);
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
}
