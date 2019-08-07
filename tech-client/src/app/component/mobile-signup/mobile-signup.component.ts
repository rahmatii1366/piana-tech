import { Component, OnInit } from '@angular/core';
import {select, Store} from "@ngrx/store";
import {selectMeDto} from "../../store/selectors/me.selectors";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AppState} from "../../store/states/app.state";
import {SignupActions} from "../../store/actions/signup.action";
import {MobileAction} from "../../store/actions/mobile.action";

@Component({
  selector: 'app-mobile-signup',
  templateUrl: './mobile-signup.component.html',
  styleUrls: ['./mobile-signup.component.css']
})
export class MobileSignupComponent implements OnInit {
  me$ = this._store.pipe(select(selectMeDto))

  mobileForm = new FormGroup({
    username: new FormControl('joe', [Validators.required, Validators.maxLength(20)]),
    mobile: new FormControl('09391366128', [Validators.required, Validators.minLength(11), Validators.maxLength(11), Validators.pattern("(09)[0123][0-9]{8}")]),
    email: new FormControl('b1@gmail.com', [Validators.required, Validators.maxLength(100), Validators.pattern('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$')]),
    password: new FormControl('123456', [Validators.required, Validators.minLength(6), Validators.maxLength(8)]),
    confirmPassword: new FormControl('123456',[Validators.required, Validators.minLength(6), Validators.maxLength(8)])
  });

  constructor(private _store: Store<AppState>) { }

  ngOnInit() {
  }

  onFormSubmit() {
    console.log('email:' + this.mobileForm.get('email').value);
    console.log('password:' + this.mobileForm.get('password').value);
    console.log('confirm:' + this.mobileForm.get('confirmPassword').value);
    this._store.dispatch(new MobileAction(({
      'mobile': this.mobileForm.get('mobile').value,
      'password': this.mobileForm.get('password').value
    })));
  }
}
