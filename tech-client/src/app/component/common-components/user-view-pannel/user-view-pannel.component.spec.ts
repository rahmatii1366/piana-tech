import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserViewPannelComponent } from './user-view-pannel.component';

describe('UserViewPannelComponent', () => {
  let component: UserViewPannelComponent;
  let fixture: ComponentFixture<UserViewPannelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserViewPannelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserViewPannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
