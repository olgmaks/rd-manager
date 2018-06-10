import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { NewCoursePopupComponent } from './../courses/new-course-popup/new-course-popup.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NewGroupPopupComponent } from '../groups/new-group-popup/new-group-popup.component';
import { Router, NavigationEnd } from '@angular/router';
import {AngularFireAuth} from "angularfire2/auth";
import * as firebase from "firebase";
import GithubAuthProvider = firebase.auth.GithubAuthProvider;

@Component({
  selector: 'app-navbar',
  templateUrl: './app-navbar.component.html',
  styleUrls: ['./app-navbar.component.css']
})
export class AppNavbarComponent implements OnInit {

  activeEntity;

  angularFireState;

  constructor(
    private modalService: NgbModal,
    public router: Router) { }

  ngOnInit() {
  }

  onCreateNewCource() {
    this.modalService.open(NewCoursePopupComponent);
  }

  onCreateNewGroup() {
    this.modalService.open(NewGroupPopupComponent);
  }

  onGitHubSignIn()
  {
    firebase.auth().signInWithPopup(new GithubAuthProvider()).then(function(result) {
      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;
      
      alert(token);
      alert(user);
      // ...
    }).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      // The email of the user's account used.
      var email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      var credential = error.credential;
      // ...
    });
  }
}
