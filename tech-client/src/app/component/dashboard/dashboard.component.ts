import {AfterViewInit, Component, OnInit} from '@angular/core';
import {RootContainerService} from "../../services/root-container/root-container.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, AfterViewInit {
  hovered = null;

  constructor(private rootContainerService: RootContainerService) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // console.log("view init authentication")
    // console.log("app component init")
    // console.log(this.topbarView)
    this.rootContainerService.changeInComponents();
  }
}
