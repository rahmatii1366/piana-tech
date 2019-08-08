import { Component, OnInit } from '@angular/core';
import {select, Store} from "@ngrx/store";
import {selectMeDto} from "../../store/selectors/me.selectors";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AppState} from "../../store/states/app.state";
import {MobileLoginAction, MobileSignupAction} from "../../store/actions/mobile.action";

@Component({
  selector: 'app-mobile-login',
  templateUrl: './mobile-login.component.html',
  styleUrls: ['./mobile-login.component.css']
})
export class MobileLoginComponent implements OnInit {
  me$ = this._store.pipe(select(selectMeDto))

  loginForm = new FormGroup({
    mobile: new FormControl('09391366128', [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern("(09)[0123][0-9]{8}")]),
    password: new FormControl('123456', [Validators.required, Validators.minLength(6), Validators.maxLength(8)]),
  });

  constructor(private _store: Store<AppState>) { }

  ngOnInit() {
  }

  onFormSubmit() {
    console.log('mobile:' + this.loginForm.get('mobile').value);
    console.log('password:' + this.loginForm.get('password').value);
    this._store.dispatch(new MobileLoginAction(({
      'mobile': this.loginForm.get('mobile').value,
      'password': this.loginForm.get('password').value
    })));
  }
}
