import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NewCoursePopupComponent } from './../courses/new-course-popup/new-course-popup.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewGroupPopupComponent } from '../groups/new-group-popup/new-group-popup.component';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.css']
})
export class AppNavbarComponent implements OnInit {

  activeEntity;

  constructor(
    private modalService: NgbModal,
    public router: Router) { }

  ngOnInit() {
  }

  onCreateNewCource() {
    this.modalService.open(NewCoursePopupComponent);
  }

  onCreateNewGroup() {
    this.modalService.open(NewGroupPopupComponent);
  }
}
