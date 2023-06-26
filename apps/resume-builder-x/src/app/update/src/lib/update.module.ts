import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { updateRoutes } from "./lib.routes";
import { ProfileComponent } from "./profile/profile.component";

@NgModule({
  imports: [CommonModule, RouterModule.forChild(updateRoutes)],
  declarations: [ProfileComponent],
})
export class UpdateModule {}
