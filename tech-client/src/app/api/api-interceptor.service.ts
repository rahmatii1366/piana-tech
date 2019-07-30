import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import * as userAction from '../store/actions/signup.action';
import { Store } from '@ngrx/store';
import { AppState } from '../store/states/app.state';
import { environment } from '../../environments/environment';

@Injectable()
export class ApiInterceptor implements HttpInterceptor {

  constructor(
    private store: Store<AppState>) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log("++++++++++++++++");
    const authReq = req.clone({
      withCredentials: true,
      headers: req.headers.set('Content-Type', 'application/json')
    });
    return next.handle(authReq).pipe(
      //  retry(1),
      tap(x => x, error => {
        if (environment.production) {
          if (error.status === 401) {
            // this.store.dispatch(new userAction.LogoutAction());
            //  TODO: uncomment the next line on production mode.
            // this.store.dispatch(new userAction.UnauthorizedAction());
          } else if (error.status === 403) {
            //go to the suspend page
          }
        }
      })
    );
  }
}
