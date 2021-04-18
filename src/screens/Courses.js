import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCourseList, getAssignments, getForums } from '../redux/courseReducer';

const Courses = () => {
    const dispatch = useDispatch();
    const [courseList, setCourseList] = useState(null);
    const [assignments, setAssignments] = useState(null);
    const [err, setErr] = useState(null);
    const [errAssignments, setErrAssignments] = useState(null);
    const [forums, setForums] = useState(null);
    const courseListState = useSelector(state => state.courseReducer.courseList);
    const courseAssignmentsState = useSelector(state => state.courseReducer.assignments);
    const forumsState = useSelector(state => state.courseReducer.forums);

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

    return (
        <div>
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
                    .sort((a, b) => a.fullname.localeCompare(b.fullname) )
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
                                        <span>{
                                            new Intl.DateTimeFormat('en-GB', {
                                                year: 'numeric',
                                                month: 'short',
                                                day: 'numeric',
                                                hour: 'numeric',
                                                minute: 'numeric',
                                                timeZone: 'GMT'
                                            }).format(new Date(forum.timemodified * 1000))
                                        }</span>
                                    </li>
                                ))}
                                {course.assignments.map(a => {
                                    if (a.duedate && !(Date.now() >= a.duedate * 1000)) {
                                        return <li key={a.id}>
                                            {a.name}
                                            <span>{
                                                new Intl.DateTimeFormat('en-GB', {
                                                    year: 'numeric',
                                                    month: 'short',
                                                    day: 'numeric',
                                                    hour: 'numeric',
                                                    minute: 'numeric',
                                                    timeZone: 'GMT'
                                                }).format(new Date(a.duedate * 1000))
                                            }</span>
                                        </li>
                                    }
                                }
                                )}
                            </ul>
                        </li>
                    ))}
            </ul>
        </div >
    );
}

export default Courses;

