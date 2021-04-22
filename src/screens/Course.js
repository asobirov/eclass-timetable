import { useParams, useHistory, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { getCourse, getCourseList } from '../redux/courseReducer';

const Course = () => {
    const { id } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

    const [course, setCourse] = useState(null);
    const [err, setErr] = useState(null);
    const courseState = useSelector(state => state.courseReducer.course);
    const courseListState = useSelector(state => state.courseReducer.courseList);
    const [courseName, setCourseName] = useState('');

    useEffect(() => {
        dispatch(getCourse(id));
        if (!courseListState) {
            dispatch(getCourseList());
        }
    }, [])

    useEffect(() => {
        const { data, error } = courseState;

        // Bug when inserted wrong ID (have to use the link twice)
        setErr(error);
        if (err) {
            setErr(null);
            history.push('/courses');
        }

        setCourse(data);
        console.log(data);
    }, [courseState, err]);

    useEffect(() => {
        if (courseListState && !err) {
            setCourseName(courseListState.data.filter(course => course.id.toString() === id)[0].fullname);
        }
    }, [courseListState]);

    return (
        <>
            <div>
                <h1 dangerouslySetInnerHTML={{ __html: courseName }} />
                {course && course.slice(1).map((c, key) => (
                    <div key={key} className='mt-4'>
                        {c.name}
                        <div className='course-modules'>
                            {c.modules && c.modules.map(mod => (
                                <a target="_blank" href={mod.url} key={mod.id}>{mod.name}</a>
                            ))}
                        </div>
                    </div>
                ))}

            </div>
        </>
    )
}

export default Course;
