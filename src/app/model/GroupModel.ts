import { CourseModel } from './CourseModel';

export interface GroupModel {
    id?: string;
    courseRef?: CourseModel;
    course: any;
    startDate: Date;
    endDate: Date;
}
