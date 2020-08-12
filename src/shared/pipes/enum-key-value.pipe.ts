import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'enumKeyValue'})
export class EnumKeyValuePipe implements PipeTransform {

  transform(sourceEnum: any, args?: Array<any>): Array<KeyValuePair<number, string>> {
    if (sourceEnum === null) {
      return [];
    } else if (sourceEnum instanceof Array) {
      return transformArray(sourceEnum, args);
    } else {
      return transformEnum(sourceEnum);
    }
  }
}

const transformArray = (sourceArray: Array<any>, args: Array<any>): Array<KeyValuePair<number, string>> => {
  const result: Array<KeyValuePair<number, string>> = [];
  const enumType = args[0];

  for (const key of sourceArray) {
    const value = enumType[key];
    const keyValuePair = new KeyValuePair<number, string>(key, value);

    result.push(keyValuePair);
  }

  return result;
};

const transformEnum = (sourceEnum): Array<KeyValuePair<number, string>> => {
  const result: Array<KeyValuePair<number, string>> = [];
  const keys: Array<number> = Object.keys(sourceEnum).filter(i => isNaN(Number(i)) === false).map(i => Number(i));

  for (const key of keys) {
    const value = sourceEnum[key];
    const keyValuePair = new KeyValuePair<number, string>(key, value);

    result.push(keyValuePair);
  }

  return result;
};

export class KeyValuePair<T1, T2> {
  key: T1 = null;
  value: T2 = null;

  constructor(key: T1, value: T2) {
    this.key = key;
    this.value = value;
  }
}
