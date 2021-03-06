import {
  Component,
  OnInit,
  Input,
  ViewChild,
  Output,
  EventEmitter
} from "@angular/core";
import { Product, Pallier } from "../world";
import { RestserviceService } from "../restservice.service";
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

  constructor(private service: RestserviceService) { }

  ngOnInit() {
    this.progressbar = new ProgressBar.Line(
      this.progressBarItem.nativeElement,
      { strokeWidth: 50, color: "#3b863de3" }
    );

    setInterval(() => {
      this.calcScore();
    }, 100);
  }

  getRealPrice() {
    return this.product.cout * this.product.croissance ** this.product.quantite;
  }

  startFabrication() {
    if (this.product.quantite >= 1 && this.product.timeleft == 0) {
      this.product.timeleft = this.product.vitesse;
      this.progressbar.set(0);
      this.progressbar.animate(1, { duration: this.product.vitesse });
      this.lastUpdate = Date.now();
    }
  }


  calcScore() {
    //si le manager est debloqué et que la prod est finie démarre une nouvelle prod
    if (this.product.managerUnlocked && this.product.timeleft == 0) {
      this.startFabrication();
    }
    if (this.product.quantite >= 1) {
      let elapsedTime = Date.now() - this.lastUpdate;
      this.lastUpdate = Date.now();
      if (this.product.timeleft != 0) {
        this.product.timeleft = this.product.timeleft - elapsedTime;
        if (this.product.timeleft <= 0) {
          this.product.timeleft = 0;
          this.progressbar.set(0);
          // on prévient le composant parent que ce produit a généré son revenu.
          this.notifyProduction.emit(this.product);
          this.service.putProduct(this.product);
        }
      }
    }
  }

  acheterProduit() {
    let max = this.calcMaxCanBuy();
    if (max < this.worldMoney) {
      this.notifyAchat.emit(this.calcMaxCanBuy());
      this.product.quantite += this.achat;
      this.checkUnlocks()
      this.service.putProduct(this.product);

    }
  }

  getImage() {
    this.product.palliers.pallier.forEach(element => {
      if (!element.unlocked) {
        if (element.seuil <= this.product.quantite) {
          return element.logo
        }
      }
    })
  }

  checkUnlocks() {
    this.product.palliers.pallier.forEach(element => {

      if (!element.unlocked) {
        if (element.seuil <= this.product.quantite) {
          console.log("CA CHECK SEUIL " + element.seuil + "CA CHECK QT " + this.product.quantite)
          element.unlocked = true

          console.log(this.product.palliers.pallier[0].unlocked)
          console.log(this.Unlockdisp())
        }
      }
    })
  }

  getLastUnlock() {
    let unlock: Pallier;
    this.product.palliers.pallier.forEach(element => {
      if (element.unlocked) {
        unlock = element;
      }
    })
    return unlock
  }

  Unlockdisp() {
    this.product.palliers.pallier.forEach(element => {

      if (element.unlocked) {
        console.log("jepasse")
        return true

      }
    }
    )
  }

  calcMaxCanBuy() {
    let price = this.getRealPrice();
    let res;
    let multiplicateur;

    if (this._qtmulti === "max") {
      //multiplicateur =Math.round((Math.log((this.worldMoney*(this.product.croissance-1))/(price)+1))/Math.log(this.product.croissance)-1);
      multiplicateur = Math.ceil(
        Math.log(
          1 - (this.worldMoney * (1 - this.product.croissance)) / price
        ) /
        Math.log(this.product.croissance) -
        1
      );
      console.log(multiplicateur);
      if (multiplicateur <= 0) {
        multiplicateur = 1;
      }
    } else {
      multiplicateur = parseInt(this._qtmulti.substr(1));
    }
    res =
      price *
      ((1 - this.product.croissance ** multiplicateur) /
        (1 - this.product.croissance));
    this.achat = multiplicateur;
    return res;
  }

  @Output() notifyProduction: EventEmitter<Product> = new EventEmitter<
    Product
  >();

  @Output() notifyAchat: EventEmitter<number> = new EventEmitter<number>();
}
