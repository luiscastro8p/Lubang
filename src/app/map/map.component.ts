import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { NavController, LoadingController } from "@ionic/angular";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { ActivatedRoute, Router } from "@angular/router";
import { AuthService } from '../../Services/auth.service';


declare var google;

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"],
})
export class MapComponent implements OnInit {
  mapRef = null;
  lat: number = 25.7751266;
  lng: number = -109.0192168;
  id;
  report: any = [];
  constructor(
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private geolocation: Geolocation,
    private route: ActivatedRoute,
    private router: Router,
    public DataService: AuthService
  ) {}

  ngOnInit() {
  
  }
  ionViewWillEnter() {
      const lat = this.route.snapshot.paramMap.get("lat");
      const lng = this.route.snapshot.paramMap.get("lng");
    this.validators(lat, lng);
    //calling an API
  }

  async validators(lat, lng) {
    if (lat && lng) {
      let url = "/map/" + lat + "/" + lng;
      this.navCtrl.navigateForward(url);
      console.log("tienes lat");

      this.lat = Number(lat);
      this.lng = Number(lng);
      this.router.navigateByUrl(url);
      this.report = [
        {
          lat: this.lat,
          lng: this.lng,
          name: "Ubicación",
          description: "",
        },
      ];
    }
    if (lat === null && lng === null) {
      console.log("no tienes lat");

      await this.DataService.GetReport().subscribe((resp: any) => {
        this.lat = 25.7751266;
        this.lng = -109.0192168;
        for (let item of resp) {
          let obj = {
            id: item.id,
            lat: Number(item.lat),
            lng: Number(item.lng),
            priority: item.priority,
            name: item.reportType.name,
            description: item.description,
          };
          this.report.push(obj);
        }
      });
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
        this.addMarker(
          item.lat,
          item.lng,
          item.name,
          item.description,
          item.id
        );
      }
      // this.addMarker(myLatLng.lat, myLatLng.lng);
    });
  }
  abrirPeligros() {
    this.navCtrl.navigateForward(["/mapa-final"]);
  }
  doRefresh(event) {
    console.log("Begin async operation");

    setTimeout(() => {
      console.log("Async operation has ended");
      event.target.complete();
    }, 2000);
  }
  private addMarker(
    lat: number,
    lng: number,
    name: string,
    description: string,
    id: number
  ) {
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
      lat: rta.coords.latitude,
      lng: rta.coords.longitude,
    };
  }
}
  
 
