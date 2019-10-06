import {AfterViewInit, Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {selectGroupState} from "../../../../store/selectors/group.selectors";
import {GroupDto} from "../../../../api/web-console/models/group-dto";
import {AppState} from "../../../../store/states/app.state";
import {RootContainerService} from "../../../../services/root-container/root-container.service";
import {GroupGetRequestAction} from "../../../../store/actions/group.action";

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit, AfterViewInit {
  groups$ = this._store.pipe(select(selectGroupState))
  groups: GroupDto[] = null;

  constructor(private _store: Store<AppState>,
              private rootContainerService: RootContainerService) {
    this._store.dispatch(new GroupGetRequestAction());
  }

  ngOnInit() {
    this.groups$.subscribe(groups => {
      if(groups && groups.length > 0)  {
        this.groups = groups;
      }
    });
  }

  ngAfterViewInit() {
    // console.log("view init authentication")
    // console.log("app component init")
    // console.log(this.topbarView)
    this.rootContainerService.changeInComponents();
  }
}
