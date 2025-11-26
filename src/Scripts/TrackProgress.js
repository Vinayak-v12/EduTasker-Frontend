document.addEventListener("DOMContentLoaded", loadProgress);

function loadProgress() {

    fetch("http://localhost:8080/Instructor/task/status", {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("token")
        }
    })
    .then(res => res.json())
    .then(response => {
        const list = response.data; // because your Response<List<ProgressDto>>
        const container = document.getElementById("progressContainer");

        container.innerHTML = "";

        list.forEach(p => {
            const percentage = Math.round(p.progressPercentage);

            let taskListHTML = "";
            p.tasks.forEach(t => {
                taskListHTML += `
                    <li class="flex justify-between border-b py-1">
                        <span>${t.title}</span>
                        <span class="font-semibold ${t.status === 'COMPLETED' ? 'text-green-600' : 'text-yellow-600'}">
                            ${t.status}
                        </span>
                    </li>
                `;
            });

            const card = `
                <div class="bg-white shadow-lg rounded-xl p-6">
                    
                    <h2 class="text-xl font-bold text-blue-700"><strong>Project :</strong>${p.projectTitle}</h2>
                    <h2 class="text-xl font-bold text-blue-700"><strong>Student name:</strong>${p.name}</h2>
                    <h2 class="text-xl font-bold text-blue-700"><strong>Id:</strong>${p.userid}</h2>
                    <p class="text-gray-700 mt-1">${p.description}</p>

                    <p class="mt-3 text-gray-600">
                        <strong>Total Tasks:</strong> ${p.totalTasks} |
                        <strong>Completed:</strong> ${p.completedTasks}
                    </p>

                    <!-- Progress Bar -->
                    <div class="mt-4">
                        <div class="w-full bg-gray-300 h-4 rounded-lg overflow-hidden">
                            <div class="h-full bg-green-500" style="width: ${percentage}%;"></div>
                        </div>
                        <p class="text-right font-semibold mt-1">${percentage}%</p>
                    </div>

                    <h3 class="text-lg font-semibold mt-4">Tasks:</h3>
                    <ul class="mt-2">
                        ${taskListHTML}
                    </ul>

                </div>
            `;

            container.innerHTML += card;
        });
    })
    .catch(err => {
        document.getElementById("progressContainer").innerHTML = `
            <p class="text-red-600 text-center col-span-2">Error loading progress data.</p>
        `;
    });
}
