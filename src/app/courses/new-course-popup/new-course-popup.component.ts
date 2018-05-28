import { Component, OnInit, ViewChild, Input, ElementRef, AfterViewInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AngularFireStorage } from 'angularfire2/storage';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-new-course-popup',
  templateUrl: './new-course-popup.component.html',
  styleUrls: ['./new-course-popup.component.css']
})
export class NewCoursePopupComponent implements OnInit {

  createNewCourseForm: FormGroup;

  fileToUpload;

  constructor(
    private db: AngularFirestore,
    public activeModal: NgbActiveModal,
    private fb: FormBuilder,
    private afStorage: AngularFireStorage) {

    this.initCreateNewCourseForm();
  }

  ngOnInit() {
  }

  onCreateNewCourse() {
    const img: string = this.createNewCourseForm.value.img;
    const task = this.afStorage.upload('/cource-icons/' + this.fileToUpload.name, this.fileToUpload);
    task.then( //
      createImage => {
        createImage.ref.getDownloadURL()
          .then(url => {
            this.db.collection('courses').doc(this.createNewCourseForm.value.code).set({
              name: this.createNewCourseForm.value.name,
              img: url
            }).then((doc) => {
              this.activeModal.close();
            });
          });
      });
  }

  uploadFile(event) {
    this.fileToUpload = event.target.files[0];
  }

  initCreateNewCourseForm() {
    this.createNewCourseForm = this.fb.group({
      'code': '',
      'name': '',
      'img': null
    });
  }
}
