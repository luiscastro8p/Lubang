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
  public items: Array<{ title: string; note: string; icon: any }> = [];
  constructor(public DataService: AuthService) {
    for (let i = 1; i < 55; i++) {
      this.items.push({
        title: "10/20/1 " + i,
        note: "This is item #" + i,
        icon: Math.floor(Math.random() * 3),
      });
    }
  }

  ngOnInit() {
  }
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

}
