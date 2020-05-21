import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { NavController, LoadingController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ActivatedRoute } from '@angular/router';

declare var google;

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.scss"],
})
export class MapComponent implements OnInit {
  mapRef = null;
  lat:number;
  lng:number;
  constructor(
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private geolocation: Geolocation,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const lat = this.route.snapshot.paramMap.get("lat");
    const lng = this.route.snapshot.paramMap.get("lng");
    this.lat = Number(lat);
    this.lng = Number(lng);
    console.log(lat);
    console.log(lng);
    
    
    this.loadMap();
  }

  ionViewDidEnter() {
    this.loadMap();
  }

  async loadMap() {
    const loading =  this.loadingCtrl.create();
    // loading.present();
    const myLatLng =  {lat:this.lat,lng:this.lng};
    const mapEle: HTMLElement = document.getElementById("map");

    // crear mapa
    this.mapRef = new google.maps.Map(mapEle, {
      center: myLatLng,
      zoom: 16,
    });
    //cierre creacion de mapa
    google.maps.event.addListenerOnce(this.mapRef, "idle", () => {
      // loading.dismiss();
      this.addMarker(myLatLng.lat, myLatLng.lng);
    });
  }
  abrirPeligros() {
    this.navCtrl.navigateForward(["/mapa-final"]);
  }
  private addMarker(lat: number, lng: number) {
    const marker = new google.maps.Marker({
      position: { lat, lng },
      map: this.mapRef,
      draggable: false,
      animation: google.maps.Animation.DROP,
      text: "Ubicación Actual!",
    });
    // marker.addListener("dragend", function (event) {
    //   var marcadorLatitud = this.getPosition().lat();
    //   var marcadorLongitud = this.getPosition().lng();
    //   console.log(marcadorLatitud);
    //   console.log(marcadorLongitud);
    // });
  }

  private async getLocation() {
    const rta = await this.geolocation.getCurrentPosition();
    return {
      // lat: rta.coords.latitude,
      // lng: rta.coords.longitude,
      lat: this.lat,
      lng:this.lng
    };
  }
}
