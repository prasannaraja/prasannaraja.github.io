import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { generateRoutes } from './lib.routes';
import { AlphaComponent } from './alpha/alpha.component';


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(generateRoutes),
  ],
  declarations: [AlphaComponent],
  exports: [AlphaComponent],
})
export class GenerateModule { }
