import {AfterViewInit, Component, OnInit} from '@angular/core';
import {RootContainerService} from "../../../services/root-container/root-container.service";
import {GuestPlayerService} from "../../../api/web-console/services/guest-player.service";
import {PlayerProfileDto} from "../../../api/web-console/models/player-profile-dto";

@Component({
  selector: 'app-search-player',
  templateUrl: './search-player.component.html',
  styleUrls: ['./search-player.component.css']
})
export class SearchPlayerComponent implements OnInit, AfterViewInit {

  pageNumber = 1;
  pageSize = 10;
  playerProfiles: PlayerProfileDto[] = [];

  constructor(private guestPlayerService: GuestPlayerService,
              private rootContainerService: RootContainerService) {
  }

  ngOnInit() {
    console.log(this.pageSize)
    console.log(this.pageNumber)
    this.guestPlayerService.getProfileOfPlayers({pageSize: this.pageSize, pageNumber: this.pageNumber})
      .subscribe(profileOfPlayers => this.playerProfiles = profileOfPlayers);
  }

  ngAfterViewInit(): void {
    this.rootContainerService.changeInComponents();
  }

}
