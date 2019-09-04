import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit, ChangeDetectorRef,
  Component, DoCheck,
  ElementRef,
  HostListener,
  ViewChild
} from '@angular/core';
import {select, Store} from "@ngrx/store";
import {AppState} from "../../store/states/app.state";
import {selectShowSpinner} from "../../store/selectors/wait.selectors";
import {RootContainerService} from "../../services/root-container/root-container.service";
import {selectMeDto} from "../../store/selectors/me.selectors";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit, AfterViewInit, AfterViewChecked, AfterContentInit, AfterContentChecked, DoCheck {
  showSpinner$ = this._store.pipe(select(selectShowSpinner))
  me$ = this._store.pipe(select(selectMeDto))

  title = 'tech-client';
  // config$ = this._store.pipe(select())

  topHeight = 0;
  bottomHeight = 0;
  contentHeight: number;

  @ViewChild('content', {static: false}) contentView: ElementRef;
  @ViewChild('topbar', {static: false}) topbarView: ElementRef;
  @ViewChild('footbar', {static: false}) footbarView: ElementRef;

  constructor(private _store: Store<AppState>,
              private rootContainerService: RootContainerService,
              private cdRef : ChangeDetectorRef) {}

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.rootContainerService.setMode({
      width: event.target.innerWidth,
      height: event.target.innerHeight
    });
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // console.log("app component init")
    // console.log(this.topbarView)
    this.rootContainerService.setCallback(this.callback, this);
    // this.contentHeight = this.elementView.nativeElement.offsetHeight;
  }

  ngAfterViewChecked() {
    // this.rootContainerService.setCallback(this.callback, this);
  }

  ngAfterContentInit() {
    // this.rootContainerService.setCallback(this.callback, this);
  }

  ngAfterContentChecked() {
    // this.rootContainerService.setCallback(this.callback, this);
  }

  ngDoCheck() {
    // this.rootContainerService.setCallback(this.callback, this);
  }

  callback (isSmall: boolean, currentSize: object, owner: Object) {
    // console.log("onResize")
    // console.log("screen height : " + currentSize['height'])
    owner['contentHeight'] = owner['contentView'].nativeElement.offsetHeight +
      owner['topbarView'].nativeElement.offsetHeight +
      owner['footbarView'].nativeElement.offsetHeight;
    // console.log("contentView offHeight : " + owner['contentView'].nativeElement.offsetHeight)
    // console.log("contentView cliHeight : " + owner['contentView'].nativeElement.clientHeight)
    // console.log("element height : " + owner['contentHeight'])
    if(owner['contentHeight'] < currentSize['height']) {
      owner['topHeight'] = owner['bottomHeight'] = (currentSize['height'] - owner['contentHeight']) / 2;
      owner['cdRef'].detectChanges();
    } else {
      owner['topHeight'] = owner['bottomHeight'] = 0;
      owner['cdRef'].detectChanges();
    }
  }
}
