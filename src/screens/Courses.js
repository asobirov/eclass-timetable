import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCourseList, getAssignments, getForums } from '../redux/courseReducer';

const Courses = ({ className, ...rest }) => {
    const dispatch = useDispatch();
    const [courseList, setCourseList] = useState(null);
    const [assignments, setAssignments] = useState(null);
    const [err, setErr] = useState(null);
    const [errAssignments, setErrAssignments] = useState(null);
    const [forums, setForums] = useState(null);
    const courseListState = useSelector(state => state.courseReducer.courseList);
    const courseAssignmentsState = useSelector(state => state.courseReducer.assignments);
    const forumsState = useSelector(state => state.courseReducer.forums);

    const oneDay = 24 * 60 * 60 * 1000;

    useEffect(() => {
        dispatch(getCourseList());
        dispatch(getAssignments());
        dispatch(getForums());
    }, []);

    useEffect(() => {
        const { data, error } = courseListState;

        if (error) {
            setErr(error);
            if (err) {
                setErr(null);
            }
        }
        if (data) {
            setCourseList(data);
        }
    }, [courseListState]);

    useEffect(() => {
        const { data, error } = courseAssignmentsState;

        if (error) {
            setErrAssignments(error);
            if (errAssignments) {
                setErr(null);
            }
        }
        if (data) {
            setAssignments(data);
        }
    }, [courseAssignmentsState]);

    useEffect(() => {
        const { data, error } = forumsState;

        if (data) {
            setForums(data);
        }
    }, [forumsState]);

    const getShadowByTime = (time) => {
        if (Math.abs(time * 1000 - Date.now()) < 2 * oneDay) {
            if (Math.abs(time * 1000 - Date.now()) < 1 * oneDay) {
                return 'shadow-red';
            }
            return 'shadow-yellow'
        }

        return 'shadow';
    }

    return (
        <div className={className ? className : ''}>
            <ul className='list'>
                <h3>
                    Courses - {!!courseList && courseList.length}
                </h3>
                {/* {!!courseList && courseList
                    .map((course, key) => (
                        <li key={key}>
                            <Link to={`/course/${course.id}`}>
                                <span dangerouslySetInnerHTML={{ __html: course.fullname }} />
                            </Link>
                        </li>
                    ))} */}
                {!!assignments && assignments
                    .sort((a, b) => a.fullname.localeCompare(b.fullname))
                    .map((course, key) => (
                        <li key={key}>
                            <div>
                                <Link to={`/course/${course.id}`}>
                                    <span dangerouslySetInnerHTML={{ __html: course.fullname }} />
                                </Link>
                            </div>

                            <ul>
                                {forums && forums.map(forum => (forum.course === course.id &&
                                    <li key={forum.cmid} style={{ boxShadow: 'rgb(6 230 147 / 40%) 0px 0px 5px 0px' }}>
                                        {forum.name}
                                        <span>Time added: {
                                            new Intl.DateTimeFormat('en-GB', {
                                                year: 'numeric',
                                                month: 'numeric',
                                                day: 'numeric',
                                                hour: 'numeric',
                                                minute: 'numeric',
                                            }).format(new Date(forum.timemodified * 1000 - 1))
                                        }</span>
                                    </li>
                                ))}
                                <span className='ml-1'></span>
                                {course.assignments.sort((a, b) => a.duedate - b.duedate).map(a => {
                                    if (a.duedate && !(Date.now() >= a.duedate * 1000)) {
                                        return (
                                            <li
                                                key={a.id}
                                                className={getShadowByTime(a.duedate)}>
                                                { a.name}
                                                <span span >
                                                    Deadline : {
                                                        new Intl.DateTimeFormat('en-GB', {
                                                            year: 'numeric',
                                                            month: 'numeric',
                                                            day: 'numeric',
                                                            hour: 'numeric',
                                                            minute: 'numeric',
                                                        }).format(new Date(a.duedate * 1000 - 1))
                                                    }
                                                </span>
                                            </li>
                                        )
                                    }
                                })}
                            </ul>
                        </li>
                    ))
                }
            </ul >
        </div >
    );
}

export default Courses;

