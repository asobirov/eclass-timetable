const getCourses = async () => {
    let userID = 1853;
    let data = `wstoken=e2ce62ab9a0098b897a1733e6e1a7505&wsfunction=core_enrol_get_users_courses&userid=${userID}`;

    const r = await fetch("http://eclass.inha.ac.kr/webservice/rest/server.php?moodlewsrestformat=json", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: data,
    })

    return {data: await r.json(), response: r};
}

export default getCourses;
