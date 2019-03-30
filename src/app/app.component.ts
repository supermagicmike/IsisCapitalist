import { Component } from "@angular/core";
import { World, Product,Pallier } from "./world";
import { RestserviceService } from "./restservice.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "captitalist-cli";
  world: World = new World();
  server: string;
  qtmulti: string;
  price = ["x1", "x10", "x100", "max"];
  constructor(private service: RestserviceService) {
    this.server = service.getServer();
    service.getWorld().then(world => {
      this.world = world;
      this.qtmulti = this.price[0];
    });
  }

  onProductionDone(p: Product) {
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

  hire(manager:Pallier){
    if (this.world.money>manager.seuil){
      this.world.money-=manager.seuil;
      manager.unlocked=true;
      this.world.products.product.forEach(element => {
        console.log("elements : ");
        console.log("elements id : "+element.id);
        console.log("idcible: "+manager.idcible);
        console.log(element.id==manager.idcible);
        if(element.id==manager.idcible){
          element.managerUnlocked=true;
          console.log("element in if : "+element+ "id : "+element.id)
        }       
      });
    }
  }
}
