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
            const data = d.data;
            if (data.errorcode) {
                alert('Error occured. Code: ' + data.errorcode + '\nMessage: ' + data.message);
                return { error: data };
            }
            return { data };
        })
    },

}