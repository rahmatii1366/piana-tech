import {AfterViewInit, Component, OnInit} from '@angular/core';
import {RootContainerService} from "../../../services/root-container/root-container.service";
import {select, Store} from "@ngrx/store";
import {AppState} from "../../../store/states/app.state";
import {selectGroupState} from "../../../store/selectors/group.selectors";

@Component({
  selector: 'app-owning-group',
  templateUrl: './owning-group.component.html',
  styleUrls: ['./owning-group.component.css']
})
export class OwningGroupComponent implements OnInit, AfterViewInit {
  groups$ = this._store.pipe(select(selectGroupState))

  constructor(private _store: Store<AppState>,
              private rootContainerService: RootContainerService) {
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
