import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { NavController, LoadingController } from "@ionic/angular";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { ActivatedRoute, Router } from "@angular/router";

declare var google;

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"],
})
export class MapComponent implements OnInit {
  
  mapRef = null;
  lat: number;
  lng: number;
  report = [
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
  ];
  constructor(
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private geolocation: Geolocation,
    private route: ActivatedRoute,
    private router:Router
  ) {}

  ngOnInit() {
    const lat = this.route.snapshot.paramMap.get("lat");
    const lng = this.route.snapshot.paramMap.get("lng");
    this.lat = Number(lat);
    this.lng = Number(lng);
    console.log(lat);
    console.log(lng);
    if (!lat && !lng) {
      this.lat = 25.7582117;
      this.lng = -108.9833722;
    }
    this.loadMap();
  }

  ionViewDidEnter() {
    this.loadMap();
  }

  async loadMap() {
    const loading = this.loadingCtrl.create();
    // loading.present();
    const myLatLng = { lat: this.lat, lng: this.lng };
    const mapEle: HTMLElement = document.getElementById("map");

    // crear mapa
    this.mapRef = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 12,
    });
    //cierre creacion de mapa
    google.maps.event.addListenerOnce(this.mapRef, "idle", () => {
      // loading.dismiss();
      for (let item of this.report) {
        this.addMarker(item.lat, item.lng, item.name, item.description,item.id);
      }
      // this.addMarker(myLatLng.lat, myLatLng.lng);
    });
  }
  abrirPeligros() { 
    this.navCtrl.navigateForward(["/mapa-final"]);
  }
  private addMarker(
    lat: number,
    lng: number,
    name: string,
    description: string,
    id:number
  ) {
    console.log(name);

    var infowindow = new google.maps.InfoWindow({
      content: "",
    });

    const marker = new google.maps.Marker({
      position: { lat, lng },
      map: this.mapRef,
      draggable: false,
      animation: google.maps.Animation.DROP,
      text: name,
    });

    marker.addListener("click", function (event) {
      infowindow.setContent("<p><b>" + name + "</b></p>" + "<p>" + description);

      infowindow.open(this.mapRef, marker);
    });
    marker.addListener("dblclick", function (event) {
      console.log(id);
      // this.router.navigateByUrl("/register/" + id);
      window.location.replace("/report/" + id);
   
      
     });
  }
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  private async getLocation() {
    const rta = await this.geolocation.getCurrentPosition();
    return {
      // lat: rta.coords.latitude,
      // lng: rta.coords.longitude,
      lat: this.lat,
      lng: this.lng,
    };
  }


}
  
 
