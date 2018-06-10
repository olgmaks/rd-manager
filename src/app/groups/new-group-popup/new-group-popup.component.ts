import {Component, OnChanges, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {CoursesService} from '../../services/courses-service';
import {GroupsService} from "../../services/groups-service";
import {FormBuilder, FormGroup} from "@angular/forms";
import {CourseModel} from "../../model/CourseModel";
import {GroupModel} from "../../model/GroupModel";
import * as firebase from "firebase";
import Timestamp = firebase.firestore.Timestamp;

@Component({
  selector: 'app-new-group-popup',
  templateUrl: './new-group-popup.component.html',
  styleUrls: ['./new-group-popup.component.css']
})
export class NewGroupPopupComponent implements OnInit
{
  createNewGroupForm: FormGroup;
  courses: CourseModel[];
  newGroupModel: GroupModel;

  constructor(public activeModal: NgbActiveModal,
              private coursesService: CoursesService,
              private groupsService: GroupsService,
              private fb: FormBuilder)
  {
  }

  ngOnInit()
  {
    this.initCreateNewGroupForm();
    this.initCourseCodeChangeHandler();
    this.coursesService.getCoursesRef()
        .subscribe(courses => {
          this.courses = courses;
          this.createNewGroupForm.patchValue({courseCode: courses[0].code});
          this.generateGroupCodeForCourse(courses[0].code);
        });
  }

  initCreateNewGroupForm()
  {
    this.createNewGroupForm = this.fb.group({
      'courseCode': '',
      'groupCode': '',
      'startDate': '',
      'endDate': ''
    });
  }

  onCreateNewGroup()
  {
    const groupCode = this.createNewGroupForm.value.groupCode;
    const courseCode = this.createNewGroupForm.value.courseCode;
    const startDate = this.createNewGroupForm.value.startDate;
    const endDate = this.createNewGroupForm.value.endDate;

    this.groupsService.createGroup(<GroupModel> {
      code : groupCode,
      course: courseCode,
      startDate: startDate,
      endDate: endDate,
      groupIndex: this.newGroupModel.groupIndex
    }).then(() => {
      this.activeModal.close();
    });
  }

  generateGroupCodeForCourse(courseCode: string)
  {
    if (!courseCode || courseCode === '') return;

    this.groupsService.prepareNewGroupCourse(courseCode)
        .subscribe(group => {
          this.newGroupModel = group;
          this.createNewGroupForm.patchValue({groupCode: group.code});
        });
  }

  initCourseCodeChangeHandler()
  {
    this.createNewGroupForm.get('courseCode').valueChanges.subscribe(courseId => {
      this.generateGroupCodeForCourse(courseId);
    });
  }
}
