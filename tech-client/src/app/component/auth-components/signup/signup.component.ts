import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AppState} from "../../../store/states/app.state";
import {select, Store} from "@ngrx/store";
import {SignupRequestAction} from "../../../store/actions/authentication.action";
import {selectMeDto} from "../../../store/selectors/me.selectors";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {RootContainerService} from "../../../services/root-container/root-container.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, AfterViewInit {
  me$ = this._store.pipe(select(selectMeDto))

  userForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.maxLength(25), Validators.pattern('^\\w+([\\.-]?\\w+)*')]),
    mobile: new FormControl('', [
      Validators.required,
      Validators.minLength(11),
      Validators.maxLength(11),
      Validators.pattern("(09)[0123][0-9]{8}")
    ]),
    // email: new FormControl('b1@gmail.com', [Validators.required, Validators.maxLength(100), Validators.pattern('^\\w+([\\.-]?\\w+)*@\\w+([\\.-]?\\w+)*(\\.\\w{2,3})+$')]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(8)]),
    confirmPassword: new FormControl('',[Validators.required, Validators.minLength(6), Validators.maxLength(8)])
  });

  constructor(private _store: Store<AppState>,
              private rootContainerService: RootContainerService) {
    // this.userForm.setValidators(this.checkPasswords());
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // console.log("view init signup")
    // console.log(this.topbarView)
    // this.rootContainerService.changeInComponents();
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
    console.log('username:' + this.userForm.get('username').value);
    console.log('mobile:' + this.userForm.get('mobile').value);
    console.log('password:' + this.userForm.get('password').value);
    console.log('confirm:' + this.userForm.get('confirmPassword').value);
    this._store.dispatch(new SignupRequestAction(({
      'username': this.userForm.get('username').value,
      'mobile': this.userForm.get('mobile').value,
      'password': this.userForm.get('password').value
    })));
  }
}
