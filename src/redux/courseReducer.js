//Action Type
import { courseAPI } from "../api/api";

const SET_COURSE = 'eclass-timetable/courseReducer/SET_COURSE'
const SET_COURSE_LIST = 'eclass-timetable/courseReducer/SET_COURSE_LIST'

let initialState = {
    course: '',
    courseList: '',
}

const courseReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_COURSE:
            return {
                ...state,
                course: action.course
            }

        case SET_COURSE_LIST:
            return {
                ...state,
                courseList: action.courseList
            }

        default:
            return state;
    }
}

//Action Creators
let setCourse = (course) => ({ type: SET_COURSE, course })
let setCourseList = (courseList) => ({ type: SET_COURSE_LIST, courseList })
//Thunk
export let getCourse = (course) => async (dispatch) => {
    let data = await courseAPI.getCourse(course);
    dispatch(setCourse(data));
}

export let getCourseList = () => async (dispatch) => {
    let data = await courseAPI.getCourseList();
    dispatch(setCourseList(data));
}

export default courseReducer;
