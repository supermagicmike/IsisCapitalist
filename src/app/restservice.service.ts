import { Injectable } from "@angular/core";
import { Http, Response, Headers } from "@angular/http";
//import { World, Pallier, Product } from "./world";
import { getDefaultService } from "selenium-webdriver/edge";

@Injectable({
  providedIn: "root"
})
export class RestserviceService {
  constructor(private http: Http) {}
  server = "http://localhost:8080/adventureisis";
  user = "";

  setUser(user) {
    this.user = user;
  }
  getUser() {
    return this.user;
  }
  private handleError(error: any): Promise<any> {
    console.error("An error occurred", error);
    return Promise.reject(error.message || error);
  }
  getWorld(): Promise<World> {
    return this.http
      .get(this.server + "webresources/generic/world")
      .toPromise()
      .then(response => response.json())
      .catch(this.handleError);
  }
}
