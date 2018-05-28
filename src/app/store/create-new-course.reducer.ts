import { Action } from '@ngrx/store';

export function createNewCoursePopupReducer(state = true, action: Action) {

    switch (action.type) {
        case 'OPEN' :
            return state = false;
        case 'CLOSED' :
            return state = true;
        default:
            return state;
    }
}
