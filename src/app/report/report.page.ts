import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";
import { NavController, LoadingController } from "@ionic/angular";
import { Geolocation } from "@ionic-native/geolocation/ngx";
import { AuthService } from '../../Services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Uris } from '../../Services/Uris'
import Swal from "sweetalert2";

declare var google;
@Component({
  selector: "app-report",
  templateUrl: "./report.page.html",
  styleUrls: ["./report.page.scss"],
})
export class ReportPage implements OnInit {
  imageURL;
  public opcion;
  lat;
  lng;
  user: any = {};
  data = {};
  image;
  url = Uris.API_IMAGE;
  id;
  filestring;
  type: any = [];
  mapRef = null;
  constructor(
    public camera: Camera,
    private geolocation: Geolocation,
    public DataService: AuthService,
    public router: Router,
    public loadingCtrl: LoadingController,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    this.id = id;
    console.log(id);

    let user = <any>JSON.parse(localStorage.getItem("USER"));
    this.user = user.user;

    if (id) {
      this.DataService.GetReportID(id).subscribe((resp: any) => {
        console.log(resp);
        this.image = this.url + resp.photo;
        console.log(this.image);

        this.lat = resp.lat;
        this.lng = resp.lng;
        this.data = {
          description: resp.description,
          reportTypeId: resp.reportType.name,
          priority: resp.priority,
        };
        this.opcion = resp.priority;
        console.log(this.opcion);
      });
    }
    this.DataService.GetAllReportType().subscribe((resp) => {
      this.type = resp;
    });
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
        this.filestring = imageData;
        this.imageURL = base64Image;
      },
      (err) => {
        // Handle error
      }
    );
  }
  register(form) {
    let lat = Number(this.lat);
    let lng = Number(this.lng);
    let obj = {
      description: form.description,
      priority: this.opcion,
      lat: lat,
      lng: lng,
      reportTypeId: form.reportTypeId,
      photo: this.filestring,
      userId: this.user.id,
    };
    console.log(obj);
    Swal.fire({
      text: "Guardando información",
      allowOutsideClick: false,
      width: "270px",
    });
    Swal.showLoading();
    this.DataService.Report(obj).subscribe(
      (resp) => {
        Swal.fire({
          text: "Se creó correctamente ",
          icon: "success",
          showConfirmButton: false,
          timer: 1500,
          width: "250px",
        });
        this.router.navigateByUrl("/list");
      },
      (err) => {
        Swal.fire({
          text: "Error en el servidor",
          icon: "warning",
          showConfirmButton: false,
          timer: 1500,
          width: "250px",
        });
      }
    );
  }
  radioGroupChange(event) {
    this.opcion = event.detail.value;
  }
  private async getLocation() {
    const rta = await this.geolocation.getCurrentPosition();
    this.lat = rta.coords.latitude;
    this.lng = rta.coords.longitude;
    console.log(this.lat);
    console.log(this.lng);
  }
}
