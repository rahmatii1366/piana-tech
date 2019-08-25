import { Component, OnInit } from '@angular/core';
import {select, Store} from "@ngrx/store";
import {AppState} from "../../../store/states/app.state";
import {selectGroupState} from "../../../store/selectors/group.selectors";
import {selectInviterListState} from "../../../store/selectors/invite.selectors";
import {InviteAcceptRequestAction, InvitersRequestAction} from "../../../store/actions/invite.action";
import {NgbActiveModal, NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {InviterListDto} from "../../../api/web-console/models/inviter-list-dto";

@Component({
  selector: 'app-inviter',
  templateUrl: './inviter.component.html',
  styleUrls: ['./inviter.component.css']
})
export class InviterComponent implements OnInit {
  showInventers= false;
  inviterList$ = this._store.pipe(select(selectInviterListState))
  inviterList: InviterListDto = null;

  // open= false;
  constructor(private _store: Store<AppState>, public modal: NgbActiveModal, private modalService: NgbModal) { }

  ngOnInit() {
    this.inviterList$.subscribe(inviterListDto => {
      // console.log("sus")
      // console.log(success.inviters);
      this.inviterList = inviterListDto;
    });
  }

  open(content) {
    this._store.dispatch(new InvitersRequestAction());
    this.modalService.open(content);
  }

  onAccept(inviter) {
    this._store.dispatch(new InviteAcceptRequestAction(inviter));
  }
}
