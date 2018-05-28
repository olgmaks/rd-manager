import { Injectable } from '@angular/core';
import { AngularFirestore, DocumentChangeAction, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable, pipe } from 'rxjs';
import { CourseModel } from '../model/CourseModel';
import { map } from 'rxjs/operators';

@Injectable()
export class CoursesService {

    constructor(private db: AngularFirestore) {
    }

    public getCourses(): Observable<DocumentChangeAction<CourseModel>[]> {
        return this.getCoursesCollection().snapshotChanges();
    }

    public  getCoursesRef() {
        return this.getCoursesCollection().snapshotChanges();
    }

    public getCoursesCollection(): AngularFirestoreCollection<CourseModel> {
        return this.db.collection<CourseModel>('courses');
    }
}
