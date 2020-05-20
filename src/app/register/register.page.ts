import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";

import { ActionSheetController } from '@ionic/angular';
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"],
})
export class RegisterPage implements OnInit {
  imageURL;
  files;
  filestring = '';
  constructor(private router: Router, public camera: Camera) {}
  public actionSheetController: ActionSheetController;
  ngOnInit() {
    this.filestring = ''
  }
  register(form: NgForm) {

    
    let obj: any = {
      name: form.value.nombre,
      email: form.value.email,
      password: form.value.password,
      surname: form.value.apellido,
    };
    // this.authService.nuevoUsuario(obj).subscribe((resp) => {
    //   this.router.navigateByUrl("/home");
    // });
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
  changeListener($event): void {
    //base 64
    this.imageURL = $event.target.files[0];
    this.files = $event.target.files;
    var reader = new FileReader();
    reader.onload = this._handleReaderLoaded.bind(this);
    reader.readAsBinaryString(this.files[0]);
  }
  _handleReaderLoaded(readerEvt) {
    var binaryString = readerEvt.target.result;
     // Converting binary string data.
    let base64Image = btoa(binaryString);
    this.filestring = "data:image/jpeg;base64," + base64Image;
    console.log(this.filestring);
    

    
  }
}
