import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { NavController, LoadingController } from "@ionic/angular";
import { Geolocation } from "@ionic-native/geolocation/ngx";

declare var google;
@Component({
  selector: "app-report",
  templateUrl: "./report.page.html",
  styleUrls: ["./report.page.scss"],
})
export class ReportPage implements OnInit {
  imageURL;
  opcion;
  lat;
  lng;
  mapRef = null;
  constructor(
    public camera: Camera,
    private loadingCtrl: LoadingController,
    private navCtrl: NavController,
    private geolocation: Geolocation
  ) {}

  ngOnInit() {
 
    this.getLocation();
  }

  takePhoto() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    };

    this.camera.getPicture(options).then(
      (imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64:
        let base64Image = "data:image/jpeg;base64," + imageData;

        this.imageURL = base64Image;
      },
      (err) => {
        // Handle error
      }
    );
  }
  register(form, radio) {
    console.log(form);

    let obj = {
      name: form.name,
      phone: form.phone,
      text: form.text,
      grade: radio,
    };
    console.log(obj);
  }
  radioGroupChange(event) {
    this.opcion = event.detail.value;
  }
  private async getLocation() {
    const rta = await this.geolocation.getCurrentPosition();
     this.lat= rta.coords.latitude;
    this.lng = rta.coords.longitude;
    console.log(this.lat);
    console.log(this.lng);
  }
}
