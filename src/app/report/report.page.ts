import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";

@Component({
  selector: "app-report",
  templateUrl: "./report.page.html",
  styleUrls: ["./report.page.scss"],
})
export class ReportPage implements OnInit {
  imageURL;
  constructor(public camera: Camera) {}

  ngOnInit() {}
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
}
