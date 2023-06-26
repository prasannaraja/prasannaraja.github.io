import { NgModule } from '@angular/core';
import { HostNamePipe } from './HostName/host-name.pipe';
import { RemoveHttpPrefixPipe } from './RemoveHttpPrefix/remove-http-prefix.pipe';

@NgModule({
  declarations: [HostNamePipe, RemoveHttpPrefixPipe],
  exports: [HostNamePipe, RemoveHttpPrefixPipe],
})
export class PipesModule {}
