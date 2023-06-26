import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HostNamePipe } from './Pipe/HostName/host-name.pipe';
import { RemoveHttpPrefixPipe } from './Pipe/RemoveHttpPrefix/remove-http-prefix.pipe';

@NgModule({
  imports: [CommonModule],
  declarations: [HostNamePipe, RemoveHttpPrefixPipe],
})
export class SharedUiModule {}
