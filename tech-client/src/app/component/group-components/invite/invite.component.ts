import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserGroupService} from "../../../api/web-console/services/user-group.service";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {AppState} from "../../../store/states/app.state";
import {WaitExitAction, WaitRequestAction} from "../../../store/actions/wait.action";

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent implements OnInit {
  mobileList: string[] = [];
  inviteForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private _store: Store<AppState>,
              private userService: UserGroupService) { }

  ngOnInit() {
    this.inviteForm = this.fb.group({
      mobile: new FormControl('', [
        Validators.required,
        Validators.minLength(11),
        Validators.maxLength(11),
        Validators.pattern("(09)[0123][0-9]{8}")
      ])
    });
  }

  onAddMobile() {
    this.mobileList.push(this.inviteForm.get('mobile').value);
    this.inviteForm.controls['mobile'].setValue('', {onlySelf: true});
  }

  onFormSubmit() {
    console.log("submit");
    this._store.dispatch(new WaitRequestAction());
    this.userService.inviteToGroup({body: {
        mobiles: this.mobileList
      }}).subscribe(res => {
      this._store.dispatch(new WaitExitAction());
      while (this.mobileList.length !== 0) {
        this.mobileList.pop()
      }
      console.log("success!");
      this.router.navigateByUrl("group/admin-view");
      console.log(res);
    }, err => {
      this._store.dispatch(new WaitExitAction());
      console.log(err);
    })
    // this.inviteForm.rese();
  }
}
