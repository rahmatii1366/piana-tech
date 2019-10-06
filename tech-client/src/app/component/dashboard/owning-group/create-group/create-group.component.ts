import {AfterViewInit, Component, OnInit} from '@angular/core';
import {icon, latLng, Marker, marker, tileLayer} from "leaflet";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {select, Store} from "@ngrx/store";
import {AppState} from "../../../../store/states/app.state";
import {selectAgeLevels} from "../../../../store/selectors/age-level.selectors";
import {AgeLevelRequestAction} from "../../../../store/actions/age-level.action";
import {GroupCreateRequestAction} from "../../../../store/actions/group.action";
import {RootContainerService} from "../../../../services/root-container/root-container.service";

@Component({
  selector: 'app-map-view',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit, AfterViewInit {
  ageLevels$ = this._store.pipe(select(selectAgeLevels));

  options = {
    layers: [
      tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { minZoom: 14, maxZoom: 16, attribution: '...' })
    ],
    zoom: 15,
    center: latLng(35.70099668759087, 51.39126741938528)
  };

  // layersControl = {
  //   baseLayers: {
  //     'Open Street Map': tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
  //     'Open Cycle Map': tileLayer('http://{s}.tile.opencyclemap.org/cycle/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' })
  //   },
  //   overlays: {
  //     'Big Circle': circle([ 46.95, -122 ], { radius: 5000 }),
  //     'Big Square': polygon([[ 46.8, -121.55 ], [ 46.9, -121.55 ], [ 46.9, -121.7 ], [ 46.8, -121.7 ]])
  //   }
  // }

  // layers = [
  //   circle([ 46.95, -122 ], { radius: 5000 }),
  //   polygon([[ 46.8, -121.85 ], [ 46.92, -121.92 ], [ 46.87, -121.8 ]]),
  //   marker([ 46.95, -122])
  // ];

  // layer = circle([ 46.95, -122 ], { radius: 5000 });

  map = null;
  myLatLng = null;
  myMarker = null;

  // groupForm = new FormGroup({
  //   name: new FormControl('', [
  //     Validators.required,
  //     Validators.minLength(11),
  //     Validators.maxLength(40)
  //   ]),
  //   ageLevel: new FormControl(this.default.value, [Validators.required]),
  // });
  groupForm: FormGroup;

  constructor(private _store: Store<AppState>,
              private fb: FormBuilder,
              private rootContainerService: RootContainerService) {
    this.groupForm = this.fb.group({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(40)
      ]),
      ageLevel: new FormControl('', [Validators.required])
    });
    // this.groupForm.controls['ageLevel'].setValue(this.ageLevels[0], {onlySelf: true});
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
  }

  ngAfterViewInit() {
    this.rootContainerService.changeInComponents();
  }

  onMapReady(map) {
    this.map = map;
  }

  onMapClick(e) {
    console.log(e.latlng);
    // var pixelPosition = this.map.latLngToLayerPoint(e.latlng);
    // console.log(pixelPosition);
    this.myLatLng = e.latlng;
    this.myMarker = marker(this.myLatLng);
    // this.http.get("https://geocode.xyz/" + this.myLatLng.lat + "," + this.myLatLng.lng + "?geoit=json&auth=276723875782572439872x3259")
    // this.http.get(" https://us1.locationiq.com/v1/reverse.php?key=5ade9f730509d4&lat=" + this.myLatLng.lat + "&lon=" + this.myLatLng.lng + "&format=json")
    //   .subscribe(res => {
    //     console.log(res);
    //   });
    this._store.dispatch(new AgeLevelRequestAction());
  }

  onFormSubmit() {
    console.log('name:' + this.groupForm.get('name').value);
    console.log('ageLevel:' + this.groupForm.get('ageLevel').value);
    console.log({
      'name': this.groupForm.get('name').value,
      'ageLevel': this.groupForm.get('ageLevel').value,
      'latitude': this.myLatLng.lat,
      'longitude': this.myLatLng.lng
    });

    this._store.dispatch(new GroupCreateRequestAction(({
      'name': this.groupForm.get('name').value,
      'ageLevel': this.groupForm.get('ageLevel').value,
      'latitude': this.myLatLng.lat,
      'longitude': this.myLatLng.lng
    })));
  }
}
