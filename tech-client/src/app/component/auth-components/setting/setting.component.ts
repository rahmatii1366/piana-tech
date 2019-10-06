import {AfterViewInit, Component, OnInit} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {AppState} from "../../../store/states/app.state";
import {selectMeDto} from "../../../store/selectors/me.selectors";
import {MeDto} from "../../../api/web-console/models/me-dto";
import {UserPlayerService} from "../../../api/web-console/services/user-player.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {selectPositions} from "../../../store/selectors/position.selectors";
import {TitleValueDto} from "../../../api/web-console/models/title-value-dto";
import {PositionRequestAction} from "../../../store/actions/position.action";
import {
  PlayerGetInfoRequestAction,
  PlayerGetPositionRequestAction,
  PlayerUpdateInfoRequestAction,
  PlayerUpdatePositionRequestAction
} from "../../../store/actions/player.action";
import {
  selectPlayerInfoDto,
  selectPlayerPositionDto,
  selectUserInfoDto
} from "../../../store/selectors/player.selectors";
import {UserInfoDto} from "../../../api/web-console/models/user-info-dto";
import {PositionEnum} from "../../../api/web-console/models/position-enum";
import {RootContainerService} from "../../../services/root-container/root-container.service";
import {PlayerInfoDto} from "../../../api/web-console/models/player-info-dto";
import {PlayerPositionDto} from "../../../api/web-console/models/player-position-dto";

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit, AfterViewInit {
  meDto$ = this._store.pipe(select(selectMeDto));
  userInfo$ = this._store.pipe(select(selectUserInfoDto));
  userInfoDto: UserInfoDto = null;
  playerInfo$ = this._store.pipe(select(selectPlayerInfoDto));
  playerInfoDto: PlayerInfoDto = null;
  playerPosition$ = this._store.pipe(select(selectPlayerPositionDto));
  playerPositionDto: PlayerPositionDto = null;
  positions$ = this._store.pipe(select(selectPositions));
  positions: TitleValueDto[] = null;
  meDto: MeDto = null;
  infoForm: FormGroup = null;

  cb: PositionEnum = PositionEnum.CB;

  constructor(private userPlayerService: UserPlayerService,
              private fb: FormBuilder,
              private rootContainerService: RootContainerService,
              private _store: Store<AppState>) {
  }

  ngOnInit() {
    this.meDto$.subscribe(meDto => {
      this.meDto = meDto;
    });

    this._store.dispatch(new PositionRequestAction());
    this._store.dispatch(new PlayerGetPositionRequestAction());
    this._store.dispatch(new PlayerGetInfoRequestAction());

    this.positions$.subscribe(positions => {
      console.log(positions);
      if(positions != null) {
        this.positions = positions;
        console.log(this.positions[0]);
      }
    });

    this.playerInfo$.subscribe(playerInfoDto => {
      console.log(playerInfoDto)
      this.playerInfoDto = playerInfoDto;
      if (playerInfoDto != null) {
        this.infoForm = this.fb.group({
          firstName: new FormControl('', []),
          lastName: new FormControl('', []),
          nationalCode: new FormControl('', [
            Validators.minLength(10),
            Validators.maxLength(10),
            Validators.pattern("[0-9]{10}")
          ])
        });
        this.infoForm.patchValue(this.playerInfoDto);
      }
    });

    this.playerPosition$.subscribe(playerPositionDto => {
      this.playerPositionDto = playerPositionDto;
    })
  }

  ngAfterViewInit() {
    this.rootContainerService.changeInComponents();
  }

  imageChanged(file) {
    this.userPlayerService.uploadPlayerImage({body: {
        playerUsername: this.meDto.username,
        image: file}}).subscribe(res =>
      console.log(res));
  }

  positionChange(v) {
    console.log("event emitted");
    console.log(v);
    this._store.dispatch(new PlayerUpdatePositionRequestAction({position: v}));
  }

  onFormSubmit() {
    console.log('username:' + this.infoForm.get('firstName').value);
    console.log('lastName:' + this.infoForm.get('lastName').value);
    console.log('nationalCode:' + this.infoForm.get('nationalCode').value);
    this._store.dispatch(new PlayerUpdateInfoRequestAction({
      'firstName': this.infoForm.get('firstName').value,
      'lastName': this.infoForm.get('lastName').value,
      'nationalCode': this.infoForm.get('nationalCode').value
    }));
  }

  // print() {
  //   console.log(this.playerInfoDto.nationalCode)
  // }
}
