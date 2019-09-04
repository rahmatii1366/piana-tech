import {AfterViewInit, Component, OnInit} from '@angular/core';
import {RootContainerService} from "../../../services/root-container/root-container.service";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit, AfterViewInit {

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
