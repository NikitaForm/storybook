import { Injectable, Injector, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ConnectionBackend, Headers, Http, Request, RequestOptions, RequestOptionsArgs, Response } from '@angular/http';

import * as configServiceContracts from '../../../core/services/config/contracts';

import { Observable, empty, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class BaseHttp extends Http {

  constructor(private backend: ConnectionBackend,
    private defaultOptions: RequestOptions,
    @Inject(configServiceContracts.SERVICE_TOKEN) private configService: configServiceContracts.IConfigService,
    private injector: Injector) {
    super(backend, defaultOptions);
  }

  public get router(): Router {
    return this.injector.get(Router);
  }

  delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return intercept(super.delete(url, this.getRequestOptionArgs(options)));
  }

  get(url: string, options?: RequestOptionsArgs): Observable<Response> {
    return intercept(super.get(url, this.getRequestOptionArgs(options)));
  }

  patch(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return intercept(super.patch(url, body, this.getRequestOptionArgs(options)));
  }

  post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
    return intercept(super.post(url, body, this.getRequestOptionArgs(options)));
  }

  put(url: string, body: string, options?: RequestOptionsArgs): Observable<Response> {
    return intercept(super.put(url, body, this.getRequestOptionArgs(options)));
  }

  request(url: string | Request, options?: RequestOptionsArgs): Observable<Response> {
    return intercept(super.request(url, options));
  }

  private getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
    if (options == null) {
      options = new RequestOptions();
    }

    if (options.headers == null) {
      options.headers = new Headers();
    }

    options.headers.append('Authorization', `Bearer ${this.configService.get('AuthorizationToken')}`);

    return options;
  }
}

function intercept(observable: Observable<Response>): Observable<Response> {
  return observable.pipe(
    catchError((err, source) => {
      if (err.status === 401) {
        location.reload();

        return empty();
      } else {
        return throwError(err);
      }
    })
  );
}
