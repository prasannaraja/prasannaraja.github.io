import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hostname',
})
export class HostNamePipe implements PipeTransform {
  transform(url: string): string {
    if (!url) {
      return '';
    }

    const parser = document.createElement('a');
    parser.href = url;
    return parser.hostname;
  }
}
