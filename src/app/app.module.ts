import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { ProductComponent } from "./product/product.component";
import { RestserviceService } from "./restservice.service";
import { World, Product, Pallier } from "./world";

@NgModule({
  declarations: [AppComponent, ProductComponent],
  imports: [BrowserModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
