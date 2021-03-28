import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import getCourses from "../data/getCourses";

const Courses = () => {

    const currentYear = 2021;

    const [courses, setCourses] = useState();

    useEffect(() => {
        getCourses().then(({data, response}) => {
            setCourses(data.filter(course =>
                course.shortname
                    .slice(course.shortname.indexOf('(') + 1, course.shortname.indexOf(')'))
                    .split(',')[0] === '2021')
            );
        });
    }, [])

    return (


        <div className="App">
            <div>
                courses:
                {!!courses && courses
                    .map((course, i) => (
                            <Link to={`/course/${course.id}`} key={i}>
                                <p dangerouslySetInnerHTML={{__html: course.fullname}}/>
                            </Link>
                        )
                    )}
                <pre>
                {JSON.stringify(courses, undefined, 2)}
                </pre>
            </div>
        </div>
    );
}

export default Courses;

