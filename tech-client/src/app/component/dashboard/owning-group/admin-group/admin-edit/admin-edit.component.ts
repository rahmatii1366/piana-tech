import {Component, OnInit} from '@angular/core';
import {icon, latLng, marker, Map, Marker, tileLayer} from "leaflet";
import {select, Store} from "@ngrx/store";
import {AppState} from "../../../../../store/states/app.state";
import {selectGroupMapState, selectGroupState} from "../../../../../store/selectors/group.selectors";
import {selectAgeLevels} from "../../../../../store/selectors/age-level.selectors";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {GroupDto} from "../../../../../api/web-console/models/group-dto";
import {selectActiveGroupState} from "../../../../../store/selectors/active-group.selectors";
import {GroupUpdateRequestAction} from "../../../../../store/actions/group.action";
import {UpdateGroupDto} from "../../../../../api/web-console/models/update-group-dto";
import {AgeLevelDto} from "../../../../../api/web-console/models/age-level-dto";

@Component({
  selector: 'app-admin-edit',
  templateUrl: './admin-edit.component.html',
  styleUrls: ['./admin-edit.component.css']
})
export class AdminEditComponent implements OnInit {
  activeGroups$ = this._store.pipe(select(selectActiveGroupState));
  groupMap$ = this._store.pipe(select(selectGroupMapState));
  ageLevels$ = this._store.pipe(select(selectAgeLevels));
  ageLevels:AgeLevelDto[] = null;
  groupName = null;
  group: GroupDto = null;

  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        minZoom: 14, maxZoom: 16,
        attribution: '...',
      })
    ],
    zoomControl: true,
    zoom: 15,
    center: latLng(35.70099668759087, 51.39126741938528)
  };
  map: Map = null;
  myLatLng = null;
  myMarker = null;
  groupForm: FormGroup;

  constructor(private _store: Store<AppState>,
              private fb: FormBuilder,
              private route: ActivatedRoute) {
    // this._store.dispatch(new AgeLevelRequestAction());
    this.groupForm = this.fb.group({
      // name: new FormControl('', [
      //   Validators.required,
      //   Validators.minLength(3),
      //   Validators.maxLength(40)
      // ]),
      // adminName: new FormControl('', [Validators.required]),
      ageLevel: null
    });
    console.log(this.groupForm)
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

    // this._store.dispatch(new GroupGetRequestAction());
    this.ageLevels$.subscribe(ageLevels => {
      if(ageLevels != null) {
        this.ageLevels = ageLevels;
        console.log(this.ageLevels[0]);
      }
    });

    this.activeGroups$.subscribe(activeGroups => {
      console.log(activeGroups)
      this.groupName = activeGroups;//['groupName'];
    });

    this.groupMap$.subscribe(groupMap => {
      console.log(this.groupMap$)
      if(groupMap && groupMap.hasOwnProperty(this.groupName)) {
        this.group = groupMap[this.groupName];
        console.log(this.group)
        this.groupForm.patchValue(this.group);
        this.myLatLng = latLng(this.group.latitude, this.group.longitude);
        this.myMarker = marker(this.myLatLng);
        if(this.map)
          this.map.panTo(this.myLatLng);
        // console.log(JSON.stringify(groupMap));
        // console.log(JSON.stringify(this.group));
      }
    });
  }

  updateClick() {
    let updateGroupDto: UpdateGroupDto = {
      ageLevel: this.groupForm.get('ageLevel').value,
      currentName: this.groupName,
      latitude: this.myLatLng.lat,
      longitude: this.myLatLng.lng,
      newName: this.groupName
      // newName: this.groupForm.get('name').value
    };
    this._store.dispatch(new GroupUpdateRequestAction(updateGroupDto));

    // console.log(this.groupForm.get('name').value);
    // console.log(this.groupForm.get('ageLevel').value);
  }

  cancelClick() {
    // console.log(this.groupForm.get('ageLevel').value)
    this.groupForm.patchValue(this.group);
    this.myLatLng = latLng(this.group.latitude, this.group.longitude);
    this.myMarker = marker(this.myLatLng);
  }

  onMapReady(map) {
    console.log(map);
    this.map = map;
    if(this.myLatLng)
      this.map.panTo(this.myLatLng);
    // this.map.dragging.disable();
    // this.myMarker = marker(latLng(35.70099668759087, 51.39126741938528));
  }

  onMapClick(e) {
    // console.log(e.latlng);
    this.myLatLng = e.latlng;
    this.myMarker = marker(this.myLatLng);
    // console.log(this.groupForm.controls['name'].value);
    // console.log(this.groupForm.controls['adminName'].value);
    // console.log(this.groupForm.controls['ageLevel'].value);
  }

  ageLevelChange(v) {
    console.log(v.target.value);
    console.log("this.groupForm.get('ageLevel').value");
    console.log(this.groupForm.get("ageLevel").value);
    // console.log(this.groupForm.get("ageLevel").value);
  }
}
