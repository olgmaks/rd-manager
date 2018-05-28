import { Component, OnInit } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from 'angularfire2/firestore';

import { AngularFireStorage } from 'angularfire2/storage';
import { Store } from '@ngrx/store';
import { CoursesService } from '../services/courses-service';
import { Observable } from 'rxjs';
import { CourseModel } from '../model/CourseModel';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.css']
})
export class CoursesComponent implements OnInit {

  courses: Observable<DocumentChangeAction<CourseModel>[]>;

  constructor(private coursesService: CoursesService) {
    this.courses = coursesService.getCourses();
  }

  ngOnInit() {
  }
}
