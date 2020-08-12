// import { Pipe, PipeTransform } from '@angular/core';
//
// @Pipe({name: 'emphasize'})
// export class EmphasizePipe implements PipeTransform {
//   transform(value: string, cssClass: string): any {
//
//     if (!cssClass) {
//       throw new Error('Css class is not defined');
//     }
//
//     if (!value) {
//       return value;
//     }
//
//     const words = value.split(' ');
//
//     const regular = words.slice(0, words.length - 1).join(' ');
//     const lastWord = words[words.length - 1];
//
//     return `${regular} <span class="${cssClass}">${lastWord}</span>`;
//   }
// }
