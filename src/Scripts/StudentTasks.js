document.addEventListener("DOMContentLoaded", () => {
    loadProjects();
    document.getElementById("createTaskForm").addEventListener("submit", createTask);
});

const token = localStorage.getItem("token");

// Load all projects for student
function loadProjects() {
    fetch("http://localhost:8080/Students/projects", {
        method: "GET",
        headers: { "Authorization": "Bearer " + token }
    })
        .then(res => res.json())
        .then(res => {
            const list = res.data;
            const select = document.getElementById("projectSelect");
            select.innerHTML = "";

            list.forEach(p => {
                const opt = document.createElement("option");
                opt.value = p.id;
                opt.textContent = p.title;
                select.appendChild(opt);
            });

            select.addEventListener("change", loadTasks);
            loadTasks(); // load first project tasks
        });
}


// Create Task
function createTask(e) {
    e.preventDefault();

    const dto = {
        projectId: document.getElementById("projectSelect").value,
        title: document.getElementById("taskTitle").value,
        description: document.getElementById("taskDescription").value,
        status: document.getElementById("status").value,
        deadline: document.getElementById("deadline").value
    };

    fetch("http://localhost:8080/Students/tasks/create", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify(dto)
    })
        .then(res => res.json())
        .then(() => {
            alert("Task Created!");
            document.getElementById("createTaskForm").reset();
            loadTasks();
        });
}


// Load all tasks of the selected project
function loadTasks() {
    const projectId = document.getElementById("projectSelect").value;
    const container = document.getElementById("taskContainer");
    container.innerHTML = "Loading...";

    fetch(`http://localhost:8080/Students/tasks/${projectId}`, {
        method: "GET",
        headers: { "Authorization": "Bearer " + token }
    })
        .then(res => res.json())
        .then(res => {
            const tasks = res.data;
            container.innerHTML = "";

            if (!tasks || tasks.length === 0) {
                container.innerHTML = `<p class="text-center text-gray-500">No Tasks Found</p>`;
                return;
            }

            tasks.forEach(t => {
                container.innerHTML += `
                <div class="bg-white shadow p-4 rounded-lg mb-4">
                    
                    <h3 class="text-lg font-bold">${t.title}</h3>
                    <p class="text-gray-700">${t.description}</p>
                    <p class="text-sm text-gray-500 mt-2"><b>Status:</b> ${t.status}</p>
                    <p class="text-sm text-gray-500"><b>Deadline:</b> ${t.deadline?.split("T")[0]}</p>

                    <!-- Update -->
                    <button onclick="showUpdateForm(${t.id}, '${t.title}', '${t.description}', '${t.status}')"
                        class="bg-yellow-500 text-white px-3 py-1 rounded mt-3">
                        Update
                    </button>

                    <!-- Delete -->
                    <button onclick="deleteTask(${t.id})"
                        class="bg-red-600 text-white px-3 py-1 rounded mt-3 ml-2">
                        Delete
                    </button>
                    
                    <!-- Comment -->
                    <div class="mt-3">
                        <textarea id="comment-${t.id}" placeholder="Add comment..."
                            class="w-full border rounded p-2"></textarea>
                        <button onclick="addComment(${t.id})"
                            class="bg-blue-600 text-white px-3 py-1 rounded mt-2">
                            Add Comment
                        </button>
                    </div>

                </div>`;
            });
        });
}


// Delete Task
function deleteTask(taskId) {
    fetch(`http://localhost:8080/Students/tasks/delete/${taskId}`, {
        method: "POST",
        headers: { "Authorization": "Bearer " + token }
    })
        .then(res => res.json())
        .then(() => {
            alert("Task Deleted!");
            loadTasks();
        });
}


// Add Comment
function addComment(taskId) {
    const comment = document.getElementById(`comment-${taskId}`).value;

    fetch(`http://localhost:8080/Students/tasks/${taskId}/comment`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: comment
    })
        .then(res => res.json())
        .then(() => {
            alert("Comment Added!");
            loadTasks();
        });
}


// Show Update Form (Pop-up UI)
function showUpdateForm(id, title, desc, status) {
    const newTitle = prompt("Update Title:", title);
    if (newTitle === null) return;

    const newDesc = prompt("Update Description:", desc);
    if (newDesc === null) return;

    const newStatus = prompt("Status (TODO / IN_PROGRESS / COMPLETED):", status);
    if (newStatus === null) return;

    const dto = {
        taskId: id,
        title: newTitle,
        description: newDesc,
        status: newStatus
    };

    fetch("http://localhost:8080/Students/tasks/update", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify(dto)
    })
        .then(res => res.json())
        .then(() => {
            alert("Task Updated!");
            loadTasks();
        });
}
