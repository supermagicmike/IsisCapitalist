import { Component, OnInit, Input } from "@angular/core";
import { Product } from "../world";

@Component({
  selector: "app-product",
  templateUrl: "./product.component.html",
  styleUrls: ["./product.component.css"]
})
export class ProductComponent implements OnInit {
  product: Product;
  server: string;

  @Input()
  set prod(value: Product) {
    this.product = value;
  }
  @Input()
  set serv(value: string) {
    this.server = value;
  }

  constructor() {}

  ngOnInit() {}
}
