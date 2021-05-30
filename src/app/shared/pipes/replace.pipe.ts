import { Pipe, PipeTransform } from '@angular/core';

/**
 * Pipe that replaces every occurences of a substring with another string
 */
@Pipe({
  name: 'replace',
})
export class ReplacePipe implements PipeTransform {
  transform(
    value: string | undefined,
    strToReplace: string,
    replacementString: string
  ): string | undefined {
    if (!value || !strToReplace || !replacementString) {
      return value;
    }

    return value.replace(new RegExp(strToReplace, 'g'), replacementString);
  }
}
