import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppNavbarComponent } from './app-navbar/app-navbar.component';

import { AngularFireModule } from 'angularfire2';
import { environment } from '../environments/environment';
import { CoursesComponent } from './courses/courses.component';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestore } from 'angularfire2/firestore';
import { NewCoursePopupComponent } from './courses/new-course-popup/new-course-popup.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule, ActionReducerMap } from '@ngrx/store';
import { createNewCoursePopupReducer } from './store/create-new-course.reducer';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { GroupsComponent } from './groups/groups.component';
import { RouterModule, Routes } from '@angular/router';
import { StudentsComponent } from './students/students.component';
import { NewGroupPopupComponent } from './groups/new-group-popup/new-group-popup.component';
import { CoursesService } from './services/courses-service';
import { GroupsService } from './services/groups-service';

const appRoutes: Routes = [
  { path: 'groups', component: GroupsComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'students', component: StudentsComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    AppNavbarComponent,
    CoursesComponent,
    NewCoursePopupComponent,
    GroupsComponent,
    StudentsComponent,
    NewGroupPopupComponent
  ],
  entryComponents: [
    NewCoursePopupComponent,
    NewGroupPopupComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireDatabaseModule,
    AngularFireStorageModule,
    StoreModule.forRoot({ newCoursePopup: createNewCoursePopupReducer }),
    NgbModule.forRoot(),
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    CoursesService,
    GroupsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
