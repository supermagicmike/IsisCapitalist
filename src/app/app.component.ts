import { Component } from "@angular/core";
import { World, Product } from "./world";
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
  constructor(private service: RestserviceService) {
    this.server = service.getServer();
    service.getWorld().then(world => {
      this.world = world;
    });
  }
  onProductionDone(p: Product) {
    this.world.money += p.cout;
    this.world.score += p.cout;
  }
}
