import { Component, OnInit } from '@angular/core';
import {icon, latLng, marker, Marker, tileLayer} from "leaflet";

@Component({
  selector: 'app-admin-group',
  templateUrl: './admin-group.component.html',
  styleUrls: ['./admin-group.component.css']
})
export class AdminGroupComponent implements OnInit {
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

  constructor() { }

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

  onMapReady(map) {
    this.map = map;
    this.myMarker = marker(latLng(35.70099668759087, 51.39126741938528));
  }

  onMapClick(e) {
    console.log(e.latlng);
    this.myLatLng = e.latlng;
    this.myMarker = marker(this.myLatLng);

  }
}
