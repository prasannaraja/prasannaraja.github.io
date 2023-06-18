import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { AlphaComponent } from "./alpha/alpha.component";

const routes: Routes = [{ path: "**", component: AlphaComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
