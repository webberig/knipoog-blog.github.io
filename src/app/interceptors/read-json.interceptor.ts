import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpResponse
} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {readFileSync} from "fs";
import {resolve} from "path";

@Injectable()
export class ReadJsonInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!request.url.startsWith("/assets/data/")) {
      return next.handle(request);
    }
    const file = resolve("./src", request.url.substr(1));
    const fileContent = readFileSync(file, "utf8");
    return of(new HttpResponse({ status: 200, body: JSON.parse(fileContent) }));
  }
}
