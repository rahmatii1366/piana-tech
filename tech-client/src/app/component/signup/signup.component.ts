import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {SampleService} from "../../api/web-console/services/sample.service";
import {AppState} from "../../store/states/app.state";
import {select, Store} from "@ngrx/store";
import {SignupActions} from "../../store/actions/user.action";
import {SignupDto} from "../../api/web-console/models/signup-dto";
import {selectMe} from "../../store/selectors/user.selectors";
import {FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators} from "@angular/forms";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  s: SignupDto = {
    email: '',
    password: ''
  };
  me$ = this._store.pipe(select(selectMe))

  userForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.maxLength(100), Validators.pattern('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$')]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(8)]),
    confirmPassword: new FormControl('',[Validators.required, Validators.minLength(6), Validators.maxLength(8)])
  });

  constructor(
    private _store: Store<AppState>,
    private httpClient: HttpClient,
    private router: Router,
    private sampleService: SampleService) {
    this.userForm.setValidators(this.checkPasswords());
  }

  ngOnInit() {
  }

  registerClick = function() {
    console.log("ss");
    // this.httpClient.post<>

    // this.s = {
    //   email: "a@gmail.com",
    //   password: "123456"
    // };

    console.log(this.s);
    this._store.dispatch(new SignupActions(this.s));


    // this.sampleService.getSample().subscribe(r => {
    //   console.log("success");
    //   console.log(r);
    // }, e => {
    //   console.log("error");
    //   console.log(e);
    // });

    // this.router.navigateByUrl("signup/email-verify")
  }

  checkPasswords() : ValidatorFn{ // here we have the 'passwords' group
    return (group: FormGroup): ValidationErrors => {
      const control1 = group.controls['password'];
      const control2 = group.controls['confirmPassword'];
      if(control1.value.toString().length > 8 || control1.value.toString().length < 6)
        control1.setErrors({lengthSize: true})
      else
        control1.setErrors(null);
      if(control2.value.toString().length > 8 || control2.value.toString().length < 6)
        control2.setErrors({lengthSize: true})
      else
        control2.setErrors(null);
      if (control1.value !== control2.value) {
        control2.setErrors({notEquivalent: true});
      } else {
        control2.setErrors(null);
      }
      return;
    };
    // return { notSame: true };
  }

  onFormSubmit() {
    console.log('email:' + this.userForm.get('email').value);
    console.log('password:' + this.userForm.get('password').value);
    console.log('confirm:' + this.userForm.get('confirmPassword').value);
  }
}
