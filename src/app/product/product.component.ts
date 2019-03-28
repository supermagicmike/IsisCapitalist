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
  worldMoney: number;
  _qtmulti: string;
  achat: number;

  @Input() set qtmulti(value: string) {
    this._qtmulti = value;
    if (this._qtmulti && this.product) this.calcMaxCanBuy();
  }

  @Input() set money(value: number) {
    this.worldMoney = value;
  }
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
      { strokeWidth: 50, color: "#3b863de3" }
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

  acheterProduit() {
    if (this.calcMaxCanBuy() < this.worldMoney) {
      this.product.quantite += this.achat;
      this.notifyAchat.emit(this.calcMaxCanBuy());
    }
  }

  calcMaxCanBuy() {
    let res = this.product.cout;
    console.log("qt multi:" + this._qtmulti);
    if (this._qtmulti === "max") {
      let cpt = 0;
      while (res + res * this.product.croissance < this.worldMoney) {
        console.log("this. cout boucle" + res);
        res += res * this.product.croissance;
        console.log(res);
        cpt++;
      }
      this.achat = cpt;
    } else {
      let multiplicateur = parseInt(this._qtmulti.substr(1));
      res =
        res *
        ((1 - this.product.croissance ** (multiplicateur + 1)) /
          (1 - this.product.croissance));
      this.achat = multiplicateur;
    }
    
    return res;
  }

  @Output() notifyProduction: EventEmitter<Product> = new EventEmitter<
    Product
  >();

  @Output() notifyAchat: EventEmitter<number> = new EventEmitter<number>();
}
