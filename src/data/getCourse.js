const getCourse = async (id) => {
    let data =  `wstoken=e2ce62ab9a0098b897a1733e6e1a7505&wsfunction=core_course_get_contents&courseid=${id}`

    const r = await fetch("http://eclass.inha.ac.kr/webservice/rest/server.php?moodlewsrestformat=json", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: data,

    })

    return {data: await r.json(), response: r};
}

export default getCourse;
