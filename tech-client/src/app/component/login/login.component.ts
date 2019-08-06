import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/states/app.state";
import {SignupActions} from "../../store/actions/signup.action";
import {LoginAction} from "../../store/actions/login.action";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    email: new FormControl('b1@gmail.com', [Validators.required, Validators.maxLength(100), Validators.pattern('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$')]),
    password: new FormControl('123456', [Validators.required, Validators.minLength(6), Validators.maxLength(8)]),
  });

  constructor(private _store: Store<AppState>) { }

  ngOnInit() {
  }

  onFormSubmit() {
    console.log('email:' + this.loginForm.get('email').value);
    console.log('password:' + this.loginForm.get('password').value);
    this._store.dispatch(new LoginAction({
      'email': this.loginForm.get('email').value,
      'password': this.loginForm.get('password').value
    }));
  }
}
