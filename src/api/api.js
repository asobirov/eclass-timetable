import * as axios from 'axios'

const instance = axios.create({
    baseURL: 'http://eclass.inha.ac.kr/webservice/rest/server.php?moodlewsrestformat=json',
})

export const courseAPI = {
    getCourse(id) {
        let d = `wstoken=e2ce62ab9a0098b897a1733e6e1a7505&wsfunction=core_course_get_contents&courseid=${id}`;
        return instance.post('', d, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then((d) => {
            const data = d.data;
            if (data.errorcode) {
                alert('Error occured. Code: ' + data.errorcode + '\nMessage: ' + data.message);
                return { error: data };
            }
            return { data };
        })
    },

    getCourseList() {
        let userID = 1853;
        let d = `wstoken=e2ce62ab9a0098b897a1733e6e1a7505&wsfunction=core_enrol_get_users_courses&userid=${userID}`;
        return instance.post('', d, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then((d) => {
            const dd = d.data;
            if (dd.errorcode) {
                alert('Error occured. Code: ' + dd.errorcode + '\nMessage: ' + dd.message);
                return { error: dd };
            }
            const data = dd.filter(course =>
                course.shortname
                    .slice(course.shortname.indexOf('(') + 1, course.shortname.indexOf(')'))
                    .split(',')[0] === '2021');
            return { data };
        })
    },

    getAssignments() {
        let d = `wstoken=e2ce62ab9a0098b897a1733e6e1a7505&wsfunction=mod_assign_get_assignments`;
        return instance.post('', d, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then((d) => {
            const dd = d.data;
            if (dd.errorcode) {
                alert('Error occured. Code: ' + dd.errorcode + '\nMessage: ' + dd.message);
                return { error: dd };
            }
            const data = dd.courses.filter(course =>
                course.shortname
                    .slice(course.shortname.indexOf('(') + 1, course.shortname.indexOf(')'))
                    .split(',')[0] === '2021');
            return { data };
        })
    },


    // Attandance Chack in my case
    getForums() {
        let d = `wstoken=e2ce62ab9a0098b897a1733e6e1a7505&wsfunction=mod_forum_get_forums_by_courses`;
        return instance.post('', d, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            }
        }).then((d) => {
            const dd = d.data;
            if (dd.errorcode) {
                alert('Error occured. Code: ' + dd.errorcode + '\nMessage: ' + dd.message);
                return { error: dd };
            }
            const data = dd;
            return { data };
        })
    },

}