import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
//import { World, Pallier, Product } from "./world";
import { World, Product, Pallier } from "./world";

@Injectable({
  providedIn: "root"
})
export class RestserviceService {
  constructor(private http: HttpClient) { }
  server = "http://localhost:8080";
  user = localStorage.getItem("username");

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
  private setHeaders(user: string): HttpHeaders {
    let oheader = new HttpHeaders().append("X-user", user);
    // console.log(oheader.get("X-user"))
    return oheader;
  }

  getWorld(): Promise<World> {
    console.log("user : " + this.user)
    console.log(this.setHeaders(this.user))
    return this.http
      .get(this.server + "/adventureisis/world", {
        headers: this.setHeaders(this.user)
      })
      .toPromise().then()
      .catch(this.handleError);
  }

  putProduct(product: Product) {
    return this.http.put(this.server + "/adventureisis/product", product, { headers: this.setHeaders(this.user) }).toPromise();
  }

  putUpgrade(upgrade: Pallier) {
    return this.http.put(this.server + "/adventureisis/upgrade", upgrade, { headers: this.setHeaders(this.user) }).toPromise();
  }

  putManager(manager: Pallier) {
    return this.http.put(this.server + "/adventureisis/manager", manager, { headers: this.setHeaders(this.user) }).toPromise();
  }

  putAngel(angel: Pallier) {
    return this.http.put(this.server + "webresources/angel", angel, { headers: this.setHeaders(this.user) }).toPromise();
  }




}
