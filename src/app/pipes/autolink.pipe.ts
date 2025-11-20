import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'autolink',
  standalone: true   // ← ESTO DEBE ESTAR
})
export class AutolinkPipe implements PipeTransform {
  transform(text: string): string {
    if (!text) return '';

    const urlRegex = /(https?:\/\/[^\s]+)/g;

    return text.replace(urlRegex, (url) => {
      return `<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`;
    });
  }
}
