import {
  Component,
  OnInit,
  Input,
  ViewChild,
  Output,
  EventEmitter
} from "@angular/core";
import { Product } from "../world";
declare var require;

const ProgressBar = require("progressbar.js");

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.css"]
})
export class ProductComponent implements OnInit {
  product: Product;
  server: string;
  progressbar: any;
  lastUpdate: any;

  @Input()
  set prod(value: Product) {
    this.product = value;
    this.lastUpdate = Date.now();
  }
  @Input()
  set serv(value: string) {
    this.server = value;
  }
  @ViewChild("bar") progressBarItem;

  constructor() {}

  ngOnInit() {
    this.progressbar = new ProgressBar.Line(
      this.progressBarItem.nativeElement,
      { strokeWidth: 50, color: "#00ff00" }
    );
    setInterval(() => {
      this.calcScore();
    }, 100);
  }

  startFabrication() {
    if (this.product.quantite >= 1) {
      this.product.timeleft = this.product.vitesse;
      this.progressbar.set(0);
      this.progressbar.animate(1, { duration: this.product.vitesse });
      this.lastUpdate = Date.now();
    }
  }

  calcScore() {
    let elapsedTime = Date.now() - this.lastUpdate;
    this.lastUpdate = Date.now();
    if (this.product.timeleft != 0) {
      this.product.timeleft = this.product.timeleft - elapsedTime;
      if (this.product.timeleft <= 0) {
        this.product.timeleft = 0;
        this.progressbar.set(0);
        // on prévient le composant parent que ce produit a généré son revenu.
        this.notifyProduction.emit(this.product);
      }
    }
  }
  @Output() notifyProduction: EventEmitter<Product> = new EventEmitter<
    Product
  >();
}
