import { Component, OnInit } from '@angular/core';
import { AngularFirestore, DocumentChangeAction } from 'angularfire2/firestore';
import { Observable } from 'rxjs';
import { collectExternalReferences } from '@angular/compiler';
import { map } from 'rxjs/operators';
import { GroupModel } from '../model/GroupModel';
import { GroupsService } from '../services/groups-service';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {

  groups: Observable<any>;

  constructor(
    private groupsService: GroupsService) {
      this.groups = groupsService.getGroups();
  }

  ngOnInit() {
  }

}
