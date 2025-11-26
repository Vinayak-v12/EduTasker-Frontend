document.addEventListener("DOMContentLoaded", loadProjects);

function loadProjects() {
    const container = document.getElementById("projectsContainer");

    fetch("http://localhost:8080/Instructor/projects", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    })
    .then(res => res.json())
    .then(res => {
        container.innerHTML = "";
        const data=res.data;
        if (data.length === 0) {
            container.innerHTML = `
                <p class="col-span-3 text-center text-gray-500 text-xl">
                    No assigned projects found.
                </p>`;
            return;
        }

        data.forEach(project => {
            const card = `
            <div class="bg-white shadow-md rounded-2xl p-6 border hover:shadow-lg transition">
                <h2 class="text-xl font-bold text-blue-600"> Title: ${project.title}</h2>
                 <p class="text-gray-700 mt-2 ">
                    <strong>Project-Id: </strong>${project.id}</p>

                <p class="text-gray-700 mt-2">
                    <strong>Description: </strong>${project.description}</p>

                <p class="mt-3 text-gray-700">
                    <strong>Deadline: </strong>${project.deadline?.split("T")[0]}
                </p>
                <p class="mt-3 text-gray-700">
                    <strong>Assigned-to: </strong>
                     ${project.assigned_to.map(u => `${u.id} - ${u.name}`).join(", ")}
                </p>

            </div>
            `;

            container.innerHTML += card;
        });
    })
    .catch(err => {
        container.innerHTML = `
            <p class="text-red-600 text-center col-span-3">
                Error loading projects.
            </p>`;
    });
}
