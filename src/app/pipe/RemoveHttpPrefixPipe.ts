import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
  name: "removeHttpPrefix",
})
export class RemoveHttpPrefixPipe implements PipeTransform {
  transform(value: string): string {
    if (value.startsWith("https://")) {
      return value.replace("https://", "");
    } else {
      return value;
    }
  }
}
