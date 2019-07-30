import { Component, OnInit } from '@angular/core';
import {select, Store} from "@ngrx/store";
import {AppState} from "../../store/states/app.state";
import {selectMeDto} from "../../store/selectors/me.selectors";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {
  SignupActions,
  SignupEmailVerifyActions,
  SignupEmailVerifySuccessActions
} from "../../store/actions/signup.action";

@Component({
  selector: 'app-email-verify',
  templateUrl: './email-verify.component.html',
  styleUrls: ['./email-verify.component.css']
})
export class EmailVerifyComponent implements OnInit {
  me$ = this._store.pipe(select(selectMeDto))
  verifyForm = new FormGroup({
    code: new FormControl('', [
      Validators.required, Validators.minLength(6),
      Validators.maxLength(6),
      Validators.pattern('[0-9]*')])
  });

  constructor(private _store: Store<AppState>) {}

  ngOnInit() {
  }

  onFormSubmit() {
    console.log('email:' + this.verifyForm.get('code').value);
    this._store.dispatch(new SignupEmailVerifyActions(({
      'code': this.verifyForm.get('code').value
    })));
  }
}
