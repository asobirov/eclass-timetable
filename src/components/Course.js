import { useParams, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import getAssignments from "../data/getAssignments";
import { getCourse } from '../redux/courseReducer';

const Course = ({ fullname }) => {
    const { id } = useParams();
    const history = useHistory();
    const dispatch = useDispatch();

    const [course, setCourse] = useState(null);
    const [err, setErr] = useState(null);
    const courseState = useSelector(state => state.courseReducer.course);
    useEffect(() => {
        dispatch(getCourse(id));
    }, [])

    useEffect(() => {
        const { data, error } = courseState;

        if (error) {
            setErr(error);
            console.log('yo');
            if (err) {
                console.log('yo yo');
                setErr(null);
                history.push('/courses');
            }
        }
        setCourse(data);
    }, [courseState, err]);

    return (
        <>
            <div>
                {course && course.map((c, key) => (
                    <div key={key}>
                        {c.name}
                    </div>
                ))}
            </div>
        </>
    )
}

export default Course;
