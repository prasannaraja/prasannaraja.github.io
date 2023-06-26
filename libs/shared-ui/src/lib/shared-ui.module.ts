import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PipesModule } from './Pipes/pipes.module';

@NgModule({
  imports: [CommonModule, PipesModule],
  declarations: [],
  exports: [PipesModule],
})
export class SharedUiModule {}
