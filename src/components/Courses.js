import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCourseList } from '../redux/courseReducer';

const Courses = () => {
    const dispatch = useDispatch();
    const [courseList, setCourseList] = useState(null);
    const [err, setErr] = useState(null);
    const courseListState = useSelector(state => state.courseReducer.courseList);

    // Since idk how to get the active(or enrolled) coruses
    let currentYear = 2021;

    useEffect(() => {
        dispatch(getCourseList());
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
            setCourseList(data.filter(course =>
                course.shortname
                    .slice(course.shortname.indexOf('(') + 1, course.shortname.indexOf(')'))
                    .split(',')[0] === '2021'));
        }
    }, [courseListState]);

    return (


        <div className="App">
            <div>
                courses:
                {!!courseList && courseList
                    .map((course, i) => (
                        <Link to={`/course/${course.id}`} key={i}>
                            <p dangerouslySetInnerHTML={{ __html: course.fullname }} />
                        </Link>
                    )
                    )}
                <pre>
                    {JSON.stringify(courseList, undefined, 2)}
                </pre>
            </div>
        </div>
    );
}

export default Courses;

