import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';
import { GroupModel } from '../model/GroupModel';

@Injectable()
export class GroupsService {

    constructor(private db: AngularFirestore) { }

    public getGroups() {
        return this.db.collection<GroupModel>('groups', ref => ref.orderBy('startDate'))
            .snapshotChanges()
            .pipe(map(groups => {
                groups.forEach(group => {
                    group.payload.doc.data()
                        .course.get().then(course => {
                            group.courseRef = course.data();
                        });
                });
                return groups;
            }));
    }
}
