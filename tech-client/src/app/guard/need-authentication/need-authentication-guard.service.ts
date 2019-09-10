import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {select, Store} from "@ngrx/store";
import {AppState} from "../../store/states/app.state";
import {selectMeDto} from "../../store/selectors/me.selectors";

@Injectable({
  providedIn: 'root'
})
export class NeedAuthenticationGuard implements CanActivate {
  me$ = this._store.pipe(select(selectMeDto))

  constructor(private _store: Store<AppState>){}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return new Observable((observer) => {
      this.me$.subscribe(me => {
        // console.log("me");
        // console.log(me);
        if(me == null) {
          // console.log("me is null");
          observer.next(false);
        } else {
          // console.log("role is user")
          // observer.next(me.role != RoleEnum.USER)
          observer.next(true);
        }
      });
    });
  }
}
