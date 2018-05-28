import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGroupPopupComponent } from './new-group-popup.component';

describe('NewGroupPopupComponent', () => {
  let component: NewGroupPopupComponent;
  let fixture: ComponentFixture<NewGroupPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewGroupPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewGroupPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
