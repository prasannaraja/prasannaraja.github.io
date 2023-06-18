import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { AlphaComponent } from "./alpha/alpha.component";
import { DataService } from "./services/data.service";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { RemoveHttpPrefixPipe } from "./pipe/RemoveHttpPrefixPipe";

@NgModule({
  declarations: [AppComponent, AlphaComponent, RemoveHttpPrefixPipe],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule],
  providers: [DataService, HttpClient],
  bootstrap: [AppComponent],
})
export class AppModule {}
