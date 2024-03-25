import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenContent',
  standalone: true,
})
export class ShortenContentPipe implements PipeTransform {
  transform(value: string | undefined, numberOfCharacters?: number): string {
    if (!value) {
      return '';
    }

    if (value.length < (numberOfCharacters ?? 10)) {
      return value;
    } else {
      return value.slice(0, numberOfCharacters ?? 10) + ' ...';
    }
  }
}
