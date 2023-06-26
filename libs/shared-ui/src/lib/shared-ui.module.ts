import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipesModule } from './pipes.module';

@NgModule({
  imports: [CommonModule, PipesModule],
  exports: [PipesModule],
})
export class SharedUiModule { }
