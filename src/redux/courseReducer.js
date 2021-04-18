//Action Type
import { courseAPI } from "../api/api";

const SET_COURSE = 'eclass-timetable/courseReducer/SET_COURSE'
const SET_COURSE_LIST = 'eclass-timetable/courseReducer/SET_COURSE_LIST'
const SET_ASSIGNMENTS = 'eclass-timetable/courseReducer/SET_ASSIGNMENTS'
const SET_FORUMS = 'eclass-timetable/courseReducer/SET_FORUMS'

let initialState = {
    course: '',
    courseList: '',
    assignments: '',
    forums: ''
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

        case SET_ASSIGNMENTS:
            return {
                ...state,
                assignments: action.assignments
            }
        case SET_FORUMS:
            return {
                ...state,
                forums: action.forums
            }

        default:
            return state;
    }
}

//Action Creators
let setCourse = (course) => ({ type: SET_COURSE, course })
let setCourseList = (courseList) => ({ type: SET_COURSE_LIST, courseList })
let setAssignments = (assignments) => ({ type: SET_ASSIGNMENTS, assignments })
let setForums = (forums) => ({ type: SET_FORUMS, forums })
//Thunk
export let getCourse = (course) => async (dispatch) => {
    let data = await courseAPI.getCourse(course);
    dispatch(setCourse(data));
}

export let getCourseList = () => async (dispatch) => {
    let data = await courseAPI.getCourseList();
    dispatch(setCourseList(data));
}

export let getAssignments = () => async (dispatch) => {
    let data = await courseAPI.getAssignments();
    dispatch(setAssignments(data));
}

export let getForums = () => async (dispatch) => {
    let data = await courseAPI.getForums();
    dispatch(setForums(data));
}

export default courseReducer;
