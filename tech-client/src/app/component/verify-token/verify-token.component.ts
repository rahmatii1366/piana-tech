import {Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {AppState} from "../../store/states/app.state";
import {selectMeDto, selectTokenRequiredDto} from "../../store/selectors/me.selectors";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {VerifyTokenRequestAction} from "../../store/actions/authentication.action";

@Component({
  selector: 'app-verify-token',
  templateUrl: './verify-token.component.html',
  styleUrls: ['./verify-token.component.css']
})
export class VerifyTokenComponent implements OnInit {
  me$ = this._store.pipe(select(selectMeDto))
  tokenRequiredDto$ = this._store.pipe(select(selectTokenRequiredDto))
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
    this._store.dispatch(new VerifyTokenRequestAction(({
      'code': this.verifyForm.get('code').value
    })));
  }
}
