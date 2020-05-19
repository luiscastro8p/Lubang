import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
@Component({
  selector: "app-register",
  templateUrl: "./register.page.html",
  styleUrls: ["./register.page.scss"],
})
export class RegisterPage implements OnInit {
  constructor(private router: Router, private camera: Camera) {}

  ngOnInit() {}
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
  takePicture() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
    };

    this.camera.getPicture(options).then(
      (imageData) => {
        console.log(imageData);
        
        // Do something with the new photo
      },
      (err) => {
        // Handle error
        console.log("Camera issue: " + err);
      }
    );
  }
}
