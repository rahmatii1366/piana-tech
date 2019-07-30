import {Component, OnInit} from '@angular/core';
import {AppState} from "../../store/states/app.state";
import {select, Store} from "@ngrx/store";
import {SignupActions} from "../../store/actions/signup.action";
import {selectMeDto} from "../../store/selectors/me.selectors";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  me$ = this._store.pipe(select(selectMeDto))

  userForm = new FormGroup({
    email: new FormControl('b1@gmail.com', [Validators.required, Validators.maxLength(100), Validators.pattern('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$')]),
    password: new FormControl('123456', [Validators.required, Validators.minLength(6), Validators.maxLength(8)]),
    confirmPassword: new FormControl('123456',[Validators.required, Validators.minLength(6), Validators.maxLength(8)])
  });

  constructor(private _store: Store<AppState>) {
    // this.userForm.setValidators(this.checkPasswords());
  }

  ngOnInit() {
  }

  // checkPasswords() : ValidatorFn{ // here we have the 'passwords' group
  //   return (group: FormGroup): ValidationErrors => {
  //     const control1 = group.controls['password'];
  //     const control2 = group.controls['confirmPassword'];
  //     if(control1.value.toString().length > 8 || control1.value.toString().length < 6)
  //       control1.setErrors({lengthSize: true})
  //     else
  //       control1.setErrors(null);
  //     if(control2.value.toString().length > 8 || control2.value.toString().length < 6)
  //       control2.setErrors({lengthSize: true})
  //     else
  //       control2.setErrors(null);
  //     if (control1.value !== control2.value) {
  //       control2.setErrors({notEquivalent: true});
  //     } else {
  //       control2.setErrors(null);
  //     }
  //     return;
  //   };
    // return { notSame: true };
  // }

  onFormSubmit() {
    console.log('email:' + this.userForm.get('email').value);
    console.log('password:' + this.userForm.get('password').value);
    console.log('confirm:' + this.userForm.get('confirmPassword').value);
    this._store.dispatch(new SignupActions(({
      'email': this.userForm.get('email').value,
      'password': this.userForm.get('password').value
    })));
  }
}
