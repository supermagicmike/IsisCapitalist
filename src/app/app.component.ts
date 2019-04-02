import { Component, OnInit } from "@angular/core";
import { World, Product, Pallier } from "./world";
import { RestserviceService } from "./restservice.service";
import { ToasterModule, ToasterService } from "angular2-toaster";
import { strictEqual } from "assert";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "captitalist-cli";
  world: World = new World();
  server: string;
  qtmulti: string;
  username: string;
  price = ["x1", "x10", "x100", "max"];
  toasterService: ToasterService;
  New: String = "";

  constructor(
    private service: RestserviceService,
    toasterService: ToasterService
  ) {
    this.server = service.getServer();
    service.getWorld().then(world => {
      this.world = world;
      this.qtmulti = this.price[0];
    });
    this.toasterService = toasterService;
  }
  ngOnInit() {
    this.username = localStorage.getItem("username");
    if (this.username == null) {
      this.username = "captain" + Math.floor(Math.random() * 10000);
      console.log("username jsuis al" + this.username);
      localStorage.setItem("username", this.username);
    }
  }

  onProductionDone(p: Product) {
    console.log("username :" + this.username);
    this.world.money += p.revenu;
    this.world.score += p.revenu;
  }

  onBuy(number) {
    this.world.money = this.world.money - number;
  }

  changeQtmulti() {
    let index = this.price.indexOf(this.qtmulti);
    if (index < this.price.length - 1) {
      this.qtmulti = this.price[index + 1];
    } else {
      this.qtmulti = this.price[0];
    }
  }

  hire(manager: Pallier) {
    if (this.world.money > manager.seuil) {
      this.world.money -= manager.seuil;
      manager.unlocked = true;
      this.world.products.product.forEach(element => {
        if (element.id == manager.idcible) {
          element.managerUnlocked = true;
          this.toasterService.pop("success", "Manager hired ! ", element.name);
        }
      });
    }
  }
  onUsernameChanged() {
    localStorage.setItem("username", this.username);
    this.service.setUser(this.username);
  }

  checkNewManager() {
    let res = false;
    this.world.managers.pallier.forEach(value => {
      if (!value.unlocked) {
        if (value.seuil < this.world.money) {
          res = true;
        }
      }
    });
    return res;
  }
}
