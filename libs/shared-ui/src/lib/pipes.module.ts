import { NgModule } from '@angular/core';
import { RemoveHttpPrefixPipe } from './Pipe/RemoveHttpPrefix/remove-http-prefix.pipe';
import { HostNamePipe } from './Pipe/HostName/host-name.pipe';

@NgModule({
    declarations: [HostNamePipe, RemoveHttpPrefixPipe],
    exports: [HostNamePipe, RemoveHttpPrefixPipe]
})
export class PipesModule { }
