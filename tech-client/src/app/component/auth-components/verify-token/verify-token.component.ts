import {AfterViewInit, Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {AppState} from "../../../store/states/app.state";
import {selectMeDto, selectTokenRequiredDto} from "../../../store/selectors/me.selectors";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {VerifyTokenRequestAction} from "../../../store/actions/authentication.action";
import {RootContainerService} from "../../../services/root-container/root-container.service";

@Component({
  selector: 'app-verify-token',
  templateUrl: './verify-token.component.html',
  styleUrls: ['./verify-token.component.css']
})
export class VerifyTokenComponent implements OnInit, AfterViewInit {
  me$ = this._store.pipe(select(selectMeDto))
  tokenRequiredDto$ = this._store.pipe(select(selectTokenRequiredDto))
  verifyForm = new FormGroup({
    code: new FormControl('', [
      Validators.required, Validators.minLength(6),
      Validators.maxLength(6),
      Validators.pattern('[0-9]*')])
  });

  constructor(private _store: Store<AppState>,
              private rootContainerService: RootContainerService) {}

  ngOnInit() {
  }

  ngAfterViewInit() {
    // console.log("view init authentication")
    // console.log("app component init")
    // console.log(this.topbarView)
    this.rootContainerService.changeInComponents();
  }

  onFormSubmit() {
    console.log('email:' + this.verifyForm.get('code').value);
    this._store.dispatch(new VerifyTokenRequestAction(({
      'code': this.verifyForm.get('code').value
    })));
  }
}
