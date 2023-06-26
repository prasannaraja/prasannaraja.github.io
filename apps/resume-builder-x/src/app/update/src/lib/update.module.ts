import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { updateRoutes } from './lib.routes';

@NgModule({
  imports: [CommonModule, RouterModule.forChild(updateRoutes)],
})
export class UpdateModule {}
