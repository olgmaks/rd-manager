import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CoursesService } from '../../services/courses-service';

@Component({
  selector: 'app-new-group-popup',
  templateUrl: './new-group-popup.component.html',
  styleUrls: ['./new-group-popup.component.css']
})
export class NewGroupPopupComponent implements OnInit {

  courses;

  constructor(
    public activeModal: NgbActiveModal,
    private coursesService: CoursesService) {

    this.courses = coursesService.getCoursesRef();
  }

  ngOnInit() {
  }

}
