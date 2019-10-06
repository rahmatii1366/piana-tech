import {AfterViewInit, Component, OnInit} from '@angular/core';
import {RootContainerService} from "../../../../../services/root-container/root-container.service";
import {select, Store} from "@ngrx/store";
import {AppState} from "../../../../../store/states/app.state";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {selectGroupMapState, selectGroupState} from "../../../../../store/selectors/group.selectors";
import {selectAgeLevels} from "../../../../../store/selectors/age-level.selectors";
import {icon, latLng, marker, Marker, tileLayer} from "leaflet";
import {GroupGetRequestAction} from "../../../../../store/actions/group.action";
import {ActivatedRoute} from "@angular/router";
import {GroupDto} from "../../../../../api/web-console/models/group-dto";
import {UserGroupService} from "../../../../../api/web-console/services/user-group.service";
import {selectActiveGroupState} from "../../../../../store/selectors/active-group.selectors";

@Component({
  selector: 'app-group-dashboard',
  templateUrl: './group-dashboard.component.html',
  styleUrls: ['./group-dashboard.component.css']
})
export class GroupDashboardComponent implements OnInit, AfterViewInit  {
  activeGroups$ = this._store.pipe(select(selectActiveGroupState));
  groupMap$ = this._store.pipe(select(selectGroupMapState));
  viewType : boolean = false;

  groupName = null;
  group: GroupDto = null;

  constructor(private _store: Store<AppState>,
              private fb: FormBuilder,
              private userGroupService: UserGroupService,
              private router: ActivatedRoute,
              private rootContainerService: RootContainerService) {
    // this.router.params.subscribe(params => {
    //   this.groupName = params['groupName'];
    // });
  }

  ngOnInit() {
    this.activeGroups$.subscribe(activeGroups => {
      console.log(activeGroups)
      this.groupName = activeGroups;//['groupName'];
    })

    this._store.dispatch(new GroupGetRequestAction());

    this.groupMap$.subscribe(groupMap => {
      if(groupMap && groupMap.hasOwnProperty(this.groupName)) {
        this.group = groupMap[this.groupName];
        // console.log(JSON.stringify(groupMap));
        // console.log(JSON.stringify(this.group));
      }
    });
  }

  ngAfterViewInit() {
    this.rootContainerService.changeInComponents();
  }

  imageChanged(file) {
    this.userGroupService.uploadGroupImage({body: {
        groupName: this.groupName,
        image: file}}).subscribe(res =>
    console.log(res));
  }
}
