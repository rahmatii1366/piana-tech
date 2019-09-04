import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {PianaWindowRefService} from "../window-ref/window-ref.service";

class CallbackObject {
  callback: (isSmall: boolean, size, owner: Object) => void;
  owner: Object;
}

@Injectable({
  providedIn: 'root'
})
export class RootContainerService {
  isSmall = true;
  currentSize = {width: 0, height: 0};
  callbacks: CallbackObject[] = [];
  resizeSubject: BehaviorSubject<object> = new BehaviorSubject({});

  constructor(private windowRef: PianaWindowRefService) {
    console.log("init window ref")
    this.init({
      width: windowRef.nativeWindow.innerWidth,
      height: windowRef.nativeWindow.innerHeight
    });
  }

  init(size) {
    this.currentSize = size;
    if(size.width < 768) {
      this.isSmall = true;
    } else {
      this.isSmall = false;
    }
    this.resizeSubject.next({isSmall: this.isSmall, size: size});
    for(let callback of this.callbacks) {
      callback.callback(this.isSmall, this.currentSize, callback.owner);
    }
  }

  setMode(size) {
    this.currentSize = size;
    if (size.width < 768) {
      if (this.isSmall === false) {
        this.isSmall = true;
      }
    } else {
      if (this.isSmall === true) {
        this.isSmall = false;
      }
    }
    this.resizeSubject.next({isSmall: this.isSmall, size: size});
    for (let callback of this.callbacks) {
      callback.callback(this.isSmall, size, callback.owner);
    }
  }

  changeInComponents() {
    // console.log("******************* changeInComponents ********************");
    for (let callback of this.callbacks) {
      callback.callback(this.isSmall, this.currentSize, callback.owner);
    }
  }

  afterResize(): BehaviorSubject<object> {
    return this.resizeSubject;
  }

  setCallback(callback: (isSmall: boolean, currentSize: object, owner: Object) => void, owner: Object) {
    this.callbacks.push({callback: callback, owner: owner});
    callback(this.isSmall, this.currentSize, owner);
  }

  isModeSmall(): boolean {
    return this.isSmall;
  }
}
