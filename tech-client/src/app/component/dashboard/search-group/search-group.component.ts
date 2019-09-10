import {AfterViewInit, Component, OnInit} from '@angular/core';
import {RootContainerService} from "../../../services/root-container/root-container.service";

@Component({
  selector: 'app-search-group',
  templateUrl: './search-group.component.html',
  styleUrls: ['./search-group.component.css']
})
export class SearchGroupComponent implements OnInit, AfterViewInit {

  constructor(private rootContainerService: RootContainerService) { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.rootContainerService.changeInComponents();
  }

}
