import {CourseModel} from './CourseModel';
import * as firebase from "firebase";
import Timestamp = firebase.firestore.Timestamp;

export interface GroupModel
{
  id?: string;
  code?: string;
  courseRef?: CourseModel;
  course?: any;
  startDate?: Timestamp | string | any;
  endDate?: Timestamp | string | any;
  groupIndex?: number;
}
