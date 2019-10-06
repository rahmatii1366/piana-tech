import {AfterViewInit, Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../../../store/states/app.state";
import {FormBuilder} from "@angular/forms";
import {AgeLevelRequestAction} from "../../../../store/actions/age-level.action";
import {RootContainerService} from "../../../../services/root-container/root-container.service";
import {ActivatedRoute} from "@angular/router";
import {SetActiveGroupRequestAction} from "../../../../store/actions/active-group.action";

@Component({
  selector: 'app-admin-group',
  templateUrl: './admin-group.component.html',
  styleUrls: ['./admin-group.component.css']
})
export class AdminGroupComponent implements OnInit, AfterViewInit {
  groupName = null;

  constructor(private _store: Store<AppState>,
              private fb: FormBuilder,
              private route: ActivatedRoute,
              private rootContainerService: RootContainerService) {
    this._store.dispatch(new AgeLevelRequestAction());
    this.route.params.subscribe(params => {
      console.log(params['groupName']);
      this.groupName = params['groupName'];
      this._store.dispatch(new SetActiveGroupRequestAction(this.groupName));
    });

  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // console.log("view init authentication")
    // console.log("app component init")
    // console.log(this.topbarView)
    this.rootContainerService.changeInComponents();
  }

}
