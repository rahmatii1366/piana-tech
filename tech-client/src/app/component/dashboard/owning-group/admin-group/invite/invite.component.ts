import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserGroupService} from "../../../../../api/web-console/services/user-group.service";
import {ActivatedRoute, Router} from "@angular/router";
import {select, Store} from "@ngrx/store";
import {AppState} from "../../../../../store/states/app.state";
import {WaitExitAction, WaitRequestAction} from "../../../../../store/actions/wait.action";
import {selectActiveGroupState} from "../../../../../store/selectors/active-group.selectors";

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent implements OnInit {
  activeGroups$ = this._store.pipe(select(selectActiveGroupState));
  mobileList: string[] = [];
  inviteForm: FormGroup;

  constructor(private fb: FormBuilder,
              private router: Router,
              private activatedRoute: ActivatedRoute,
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

  groupName = null;

  onAddMobile() {
    this.mobileList.push(this.inviteForm.get('mobile').value);
    this.inviteForm.controls['mobile'].setValue('', {onlySelf: true});
    this.activeGroups$.subscribe(groupName => this.groupName = groupName)
  }

  onFormSubmit() {
    console.log("submit");
    this._store.dispatch(new WaitRequestAction());
    this.userService.inviteToGroup({body: {
        groupName: this.groupName,
        mobiles: this.mobileList
      }}).subscribe(res => {
      this._store.dispatch(new WaitExitAction());
      while (this.mobileList.length !== 0) {
        this.mobileList.pop()
      }
      console.log("success!");
      this.router.navigate(["dashboard/owned/admin/" + this.groupName + "/group-dashboard"])
      // this.router.navigate(["../group-dashboard"]);
      console.log(res);
    }, err => {
      this._store.dispatch(new WaitExitAction());
      console.log(err);
    })
    // this.inviteForm.rese();
  }
}
