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
  public items:any = [];
  constructor(public DataService: AuthService) {}

  ngOnInit() {
    this.DataService.GetReport().subscribe((resp: any) => {
      this.items = resp;
    console.log(resp);
    
      
    })
  }
  show() {
    console.log("hola");
  }
  doRefresh(event) {
    console.log("Begin async operation");

    setTimeout(() => {
     this.DataService.GetReport().subscribe((resp: any) => {
       this.items = resp;
       console.log(resp);
     });
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
