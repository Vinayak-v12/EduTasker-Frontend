document.addEventListener("DOMContentLoaded", loadProjects);

function loadProjects() {
    const container = document.getElementById("projectsContainer");

    fetch("http://localhost:8080/Students/projects", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    })
        .then((res) => res.json())
        .then((resData) => {

            const data = resData.data;  // because your backend returns {data:"", message:""}

            container.innerHTML = "";

            if (!data || data.length === 0) {
                container.innerHTML = `
                    <p class="col-span-3 text-center text-gray-500 text-xl">
                        No projects assigned.
                    </p>`;
                return;
            }

            data.forEach(project => {

                const card = `
                <div class="bg-white shadow-md rounded-2xl p-6 border hover:shadow-lg transition">

                    <h2 class="text-xl font-bold text-blue-600">${project.title}</h2>

                    <p class="mt-2 text-gray-700">${project.description}</p>

                    <p class="mt-3 text-gray-500">
                        <strong>Deadline: </strong> ${project.deadline.split("T")[0]}
                    </p>

                    <p class="mt-1 text-gray-700">
                        <strong>Assigned By: </strong> ${project.assigned_by?.name ?? "Unknown"}
                    </p>


                </div>
                `;

                container.innerHTML += card;
            });
        })
        .catch((err) => {
            console.error(err);
            container.innerHTML = `
                <p class="col-span-3 text-center text-red-600 text-xl">
                    Error loading projects.
                </p>`;
        });
}


