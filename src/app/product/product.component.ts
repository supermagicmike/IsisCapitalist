import { Component, OnInit, Input, ViewChild } from "@angular/core";
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
    if (this.product.quantite > 0) {
      this.product.timeleft = this.product.vitesse;
      let progress = 1;
      this.progressbar.animate(1, { duration: this.product.vitesse });
      this.progressbar.set(progress);
      this.lastUpdate = Date.now();
    }
  }
  calcScore() {
    if (this.product.timeleft > 0) {
      this.product.timeleft = Date.now() - this.product.timeleft;
    }
    if (this.product.timeleft <= 0) {
      this.product.timeleft = 0;
    }
  }
}
