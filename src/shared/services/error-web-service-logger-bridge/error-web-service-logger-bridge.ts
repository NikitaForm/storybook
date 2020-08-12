import { Inject, Injectable } from '@angular/core';
import { Headers, RequestOptions } from '@angular/http';
import { HttpClient } from '@angular/common/http';

import { BaseHttp } from '../base-http/base-http';
import * as configServiceContracts from '../../../core/services/config/contracts';

import { environment } from '../../../environments/environment';
import { EnvironmentEnum } from '../../../environments/environment.interface';

@Injectable()
export class ErrorWebServiceLoggerBridge {
  private readonly API_PATH: string;

  constructor(@Inject(HttpClient) private http: BaseHttp,
    @Inject(configServiceContracts.SERVICE_TOKEN) private configService: configServiceContracts.IConfigService) {
    this.API_PATH = window.location.origin;
  }

  error(error: any): void {
    const requestUrl = `${this.API_PATH}/log`;

    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    const requestOptions = new RequestOptions();
    requestOptions.headers = headers;

    const message = error.message ? error.message : error.toString();
    const appVersion = environment.version;

    // if (error instanceof Response) {
    // } else {
    // }

    // get the stack trace, lets grab the last 10 stacks only
    // const stackFrames = await StackTrace.fromError(errorText);
    //
    // const stackStr = stackFrames
    //   .splice(0, 20)
    //   .map(sf => sf.toString())
    //   .join('\n');

    // const errorStr = JSON.stringify(serializeError(errorText));

    // const messageBody = {
    //   message
    //   // applicationContext: appCtx
    // };

    const bodyStr = JSON.stringify({ message, appVersion });

    if (environment.environment === EnvironmentEnum.PRODUCTION) {
      this.http.post(requestUrl, bodyStr, requestOptions)
        .subscribe();
    } else {
      console.error(message);
    }
  }
}

//
// export const getEnvironmentAlias = (env: EnvironmentEnum): string => {
//   switch (env) {
//     case EnvironmentEnum.LOCAL:
//       return 'local';
//     case EnvironmentEnum.DEVELOPMENT:
//       return 'dev';
//     case EnvironmentEnum.PRODUCTION:
//       return 'prod';
//     default:
//       throw new Error('getEnvironmentAlias');
//   }
// };
//
// export const serializeError = (value: any): any => {
//   if (typeof value === 'object') {
//     return _destroyCircular(value, []);
//   }
//
//   // People sometimes throw things besides Error objects, so…
//
//   if (typeof value === 'function') {
//     // JSON.stringify discards functions. We do too, unless a function is thrown directly.
//     return `[Function: ${(value.name || 'anonymous')}]`;
//   }
//
//   return value;
// };
//
// // https://www.npmjs.com/package/destroy-circular
// function _destroyCircular(from, seen): any {
//   const to: any = Array.isArray(from) ? [] : {};
//
//   seen.push(from);
//
//   for (const key of Object.keys(from)) {
//     const value = from[key];
//
//     if (typeof value === 'function') {
//       continue;
//     }
//
//     if (!value || typeof value !== 'object') {
//       to[key] = value;
//       continue;
//     }
//
//     if (seen.indexOf(from[key]) === -1) {
//       to[key] = _destroyCircular(from[key], seen.slice(0));
//       continue;
//     }
//
//     to[key] = '[Circular]';
//   }
//
//   if (typeof from.name === 'string') {
//     to.name = from.name;
//   }
//
//   if (typeof from.message === 'string') {
//     to.message = from.message;
//   }
//
//   if (typeof from.stack === 'string') {
//     to.stack = from.stack;
//   }
//
//   return to;
// }
