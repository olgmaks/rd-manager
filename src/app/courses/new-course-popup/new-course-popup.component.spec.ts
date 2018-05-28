import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCoursePopupComponent } from './new-course-popup.component';

describe('NewCoursePopupComponent', () => {
  let component: NewCoursePopupComponent;
  let fixture: ComponentFixture<NewCoursePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCoursePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCoursePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
