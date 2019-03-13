import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
//import { World, Pallier, Product } from "./world";
import { World, Product, Pallier } from "./world";

@Injectable({
  providedIn: "root"
})
export class RestserviceService {
  constructor(private http: HttpClient) {}
  server = "http://localhost:8080";
  user = "";

  setUser(user) {
    this.user = user;
  }
  getUser() {
    return this.user;
  }
  getServer() {
    return this.server;
  }
  private handleError(error: any): Promise<any> {
    console.error("An error occurred", error);
    return Promise.reject(error.message || error);
  }

  getWorld(): Promise<World> {
    return this.http
      .get(this.server + "/adventureisis/world")
      .toPromise()
      .catch(this.handleError);
  }
}
