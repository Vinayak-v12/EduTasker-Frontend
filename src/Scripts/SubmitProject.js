document.addEventListener("DOMContentLoaded", loadProjects);

const token = localStorage.getItem("token");

function loadProjects() {
    fetch("http://localhost:8080/Students/projects", {
        method: "GET",
        headers: { "Authorization": "Bearer " + token }
    })
        .then(res => res.json())
        .then(res => {
            const projects = res.data;
            const select = document.getElementById("projectSelect");

            select.innerHTML = "";
            projects.forEach(p => {
                const opt = document.createElement("option");
                opt.value = p.id;
                opt.textContent = p.title;
                select.appendChild(opt);
            });
        });
}

function submitProject() {
    const dto = {
        projectId: document.getElementById("projectSelect").value,
        content: document.getElementById("submissionContent").value,
    };

    fetch("http://localhost:8080/Students/submitproject", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify(dto)
    })
        .then(res => res.json())
        .then(() => {
            alert("Project Submitted Successfully!");
        })
        .catch(err => alert("Error submitting project"));
}
