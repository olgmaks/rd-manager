import {Injectable} from '@angular/core';
import {
  AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument,
  DocumentChangeAction
} from 'angularfire2/firestore';
import {Observable} from 'rxjs';
import {CourseModel} from '../model/CourseModel';
import {map} from "rxjs/internal/operators";

@Injectable()
export class CoursesService
{

  constructor(private db: AngularFirestore)
  {
  }

  public getCourses(): Observable<DocumentChangeAction<CourseModel>[]>
  {
    return this.getCoursesCollection().snapshotChanges();
  }

  public getCoursesRef()
  {
    return this.getCoursesCollection().valueChanges();
  }

  public getCoursesCollection(): AngularFirestoreCollection<CourseModel>
  {
    return this.db.collection<CourseModel>('courses');
  }

  public findCourseForCourseCode(courseId: string): AngularFirestoreDocument<CourseModel>
  {
    return this.db.collection<CourseModel>(`/courses`).doc(courseId);
  }
}
