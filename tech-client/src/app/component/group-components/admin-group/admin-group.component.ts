import { Component, OnInit } from '@angular/core';
import {icon, latLng, marker, Marker, tileLayer} from "leaflet";
import {select, Store} from "@ngrx/store";
import {AppState} from "../../../store/states/app.state";
import {selectGroupState} from "../../../store/selectors/group.selectors";
import {GroupGetRequestAction} from "../../../store/actions/group.action";
import {selectAgeLevels} from "../../../store/selectors/age-level.selectors";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AgeLevelRequestAction} from "../../../store/actions/age-level.action";

@Component({
  selector: 'app-admin-group',
  templateUrl: './admin-group.component.html',
  styleUrls: ['./admin-group.component.css']
})
export class AdminGroupComponent implements OnInit {
  group$ = this._store.pipe(select(selectGroupState))
  ageLevels$ = this._store.pipe(select(selectAgeLevels));
  ageLevels = null;

  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { minZoom: 14, maxZoom: 16, attribution: '...' })
    ],
    zoom: 15,
    center: latLng(35.70099668759087, 51.39126741938528)
  };
  map = null;
  myLatLng = null;
  myMarker = null;
  groupForm: FormGroup;

  constructor(private _store: Store<AppState>, private fb: FormBuilder) {
    this._store.dispatch(new AgeLevelRequestAction());
  }

  ngOnInit() {
    const iconRetinaUrl = 'assets/image/leaflet/marker-icon-2x.png';
    const iconUrl = 'assets/image/leaflet/marker-icon.png';
    const shadowUrl = 'assets/image/leaflet/marker-shadow.png';
    let iconDefault = icon({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41],
    });
    Marker.prototype.options.icon = iconDefault;

    this._store.dispatch(new GroupGetRequestAction());
    this.ageLevels$.subscribe(ageLevels => {
      if(ageLevels != null) {
        this.ageLevels = ageLevels;
        console.log(this.ageLevels[0])
        this.groupForm = this.fb.group({
          name: new FormControl('', [
            Validators.required,
            Validators.minLength(3),
            Validators.maxLength(40)
          ]),
          adminName: new FormControl('', [Validators.required]),
          ageLevel: [this.ageLevels[0]]
        });
      }
    })
    this.group$.subscribe(group => {
      if(group) {
        this.groupForm.patchValue(group);
        for (let i = 0; i < this.ageLevels.length; i++) {
          if (this.ageLevels[i]['value'] === group.ageLevel['value']){
            this.ageLevels[i] = group.ageLevel;
            break;
          }
        }
        // this.groupForm.controls['ageLevel'].setValue(this.ageLevels[0], {onlySelf: true});
      }
    });
  }

  onMapReady(map) {
    this.map = map;
    this.myMarker = marker(latLng(35.70099668759087, 51.39126741938528));
  }

  onMapClick(e) {
    console.log(e.latlng);
    this.myLatLng = e.latlng;
    this.myMarker = marker(this.myLatLng);
    console.log(this.groupForm.controls['name'].value);
    console.log(this.groupForm.controls['adminName'].value);
    console.log(this.groupForm.controls['ageLevel'].value);
  }
}
