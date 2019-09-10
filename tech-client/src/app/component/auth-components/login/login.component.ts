import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Store} from "@ngrx/store";
import {AppState} from "../../../store/states/app.state";
import {LoginRequestAction} from "../../../store/actions/authentication.action";
import {RootContainerService} from "../../../services/root-container/root-container.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm = new FormGroup({
    mobile: new FormControl('', [
      Validators.required,
      Validators.minLength(11),
      Validators.maxLength(11),
      Validators.pattern("(09)[0123][0-9]{8}")
    ]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(8)]),
  });

  constructor(private _store: Store<AppState>,
              private rootContainerService: RootContainerService) { }

  ngOnInit() {
    this.loginForm.controls['mobile'].setValue('09391366128', {onlySelf: true});
    this.loginForm.controls['password'].setValue('123456', {onlySelf: true});
  }

  ngAfterViewInit() {
    // console.log("view init login")
    // console.log("app component init")
    // console.log(this.topbarView)
    // this.rootContainerService.changeInComponents();
  }

  onFormSubmit() {
    console.log('mobile:' + this.loginForm.get('mobile').value);
    console.log('password:' + this.loginForm.get('password').value);
    this._store.dispatch(new LoginRequestAction({
      'mobile': this.loginForm.get('mobile').value,
      'password': this.loginForm.get('password').value
    }));
  }
}
