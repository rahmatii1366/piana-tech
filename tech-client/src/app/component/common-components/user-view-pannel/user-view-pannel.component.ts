import {AfterViewInit, Component, OnInit} from '@angular/core';
import {RootContainerService} from "../../../services/root-container/root-container.service";

@Component({
  selector: 'app-user-view-pannel',
  templateUrl: './user-view-pannel.component.html',
  styleUrls: ['./user-view-pannel.component.css']
})
export class UserViewPannelComponent implements OnInit, AfterViewInit {
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
