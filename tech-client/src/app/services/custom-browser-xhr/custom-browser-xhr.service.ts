import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class CustomBrowserXhrService implements HttpInterceptor {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("++++++++++++++++++++++++++");
    console.log("++++++++++++++++++++++++++");

    // console.log("interceptor: " + req.url);
    req = req.clone({
      withCredentials: true
    });

    return next.handle(req);
  }
}
