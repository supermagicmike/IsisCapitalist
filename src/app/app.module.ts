import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { AppComponent } from "./app.component";
import { ProductComponent } from "./product/product.component";
import { RestserviceService } from "./restservice.service";
import { BigvaluePipe } from "./bigvalue.pipe";
import { ModalComponent } from "./modal/modal.component";
import { FormsModule } from "@angular/forms";
import { ToasterModule, ToasterService } from "angular2-toaster";
@NgModule({
  declarations: [AppComponent, ProductComponent, BigvaluePipe, ModalComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ToasterModule
  ],
  providers: [RestserviceService, ToasterService],
  bootstrap: [AppComponent]
})
export class AppModule {}
