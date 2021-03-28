import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import getAssignments from "../data/getAssignments";
import getCourse from "../data/getCourse";

const Course = ({fullname}) => {
    const {id} = useParams();

    const [course, setCourse] = useState({});

    useEffect(() => {
        getCourse(id).then(({data, response}) => {
            setCourse(data);
            console.log(data);
        });
    }, [id])

    return (
        {fullname}
    )
}

export default Course;
