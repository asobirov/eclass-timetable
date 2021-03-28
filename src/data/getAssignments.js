const getAssignments = async () => {
    let data = {
        wstoken: "e2ce62ab9a0098b897a1733e6e1a7505",
        wsfunction: 'mod_assign_get_assignments'
    };

    const r = await fetch("http://eclass.inha.ac.kr/webservice/rest/server.php?moodlewsrestformat=json", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: "wstoken=e2ce62ab9a0098b897a1733e6e1a7505&wsfunction=mod_assign_get_assignments",
    })

    return {data: await r.json(), response: r};
}

export default getAssignments;
