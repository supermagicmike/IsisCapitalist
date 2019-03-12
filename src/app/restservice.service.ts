import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
import { World, Pallier, Product } from "./world";

@Injectable({
  providedIn: "root"
})
export class RestserviceService {
  constructor(private http: Http) {}
}
