import {Injectable} from '@angular/core';
import {AngularFirestore, DocumentSnapshot} from 'angularfire2/firestore';
import {map} from 'rxjs/operators';
import {GroupModel} from '../model/GroupModel';
import {fromPromise} from 'rxjs/observable/fromPromise';
import {Observable} from "rxjs/Rx";
import {CourseModel} from "../model/CourseModel";
import {CoursesService} from "./courses-service";
import {AngularFireDatabase} from "angularfire2/database";
import 'rxjs/add/operator/mergeMap'
import 'rxjs/add/operator/map'
import * as firebase from "firebase";
import Timestamp = firebase.firestore.Timestamp;

@Injectable()
export class GroupsService
{

  constructor(private fs: AngularFirestore,
              private db: AngularFireDatabase,
              private coursesService: CoursesService)
  {
  }

  public getGroups(): Observable<GroupModel[]>
  {
    return this.fs.collection<GroupModel>('groups', ref => ref.orderBy('startDate'))
               .snapshotChanges()
               .pipe(map(groups => groups.map<GroupModel>(group => (
                 <GroupModel>{
                   id: group.payload.doc.id,
                   startDate: group.payload.doc.data().startDate,
                   endDate: group.payload.doc.data().endDate,
                   course: fromPromise<DocumentSnapshot<CourseModel>>(group.payload.doc.data().course.get())
                     .pipe(map(course => (
                       <CourseModel>{
                         id: course.id,
                         name: course.data().name,
                         img: course.data().img
                       })))
                 }))));
  }

  prepareNewGroupCourse(courseCode: string): Observable<GroupModel>
  {
    const course = this.coursesService.findCourseForCourseCode(courseCode);
    const newGroupIndexObs = this
      .fs
      .collection<GroupModel>('/groups', ref => ref
        .where('course', '==', course.ref)
        .orderBy('code', 'desc')
        .limit(1))
      .valueChanges()
      .pipe(map(groups => groups[0] ? groups[0].groupIndex + 1 : 1));

    return newGroupIndexObs.mergeMap(
      index => course.valueChanges().map(course => {
        return <GroupModel>{
          code: course.groupNamePrefix + '-' + index,
          groupIndex: index,
          course: course
        }
      }));
  }


  createGroup(groupModel: GroupModel): Promise<void>
  {
    const courseRef = this.coursesService.findCourseForCourseCode(groupModel.course).ref; 

    return this.fs.collection<GroupModel>('/groups').doc(groupModel.code).set(<GroupModel>{
      course: courseRef,
      code: groupModel.code,
      startDate: this.convertJsonDateToTimestamp(groupModel.startDate),
      endDate: this.convertJsonDateToTimestamp(groupModel.endDate),
      groupIndex: groupModel.groupIndex
    });
  }

  convertJsonDateToTimestamp(jsonDate: { year, month, day }): Timestamp
  {
    const date = new Date(jsonDate.year, jsonDate.month, jsonDate.day);
    return Timestamp.fromDate(date);
  }
}
