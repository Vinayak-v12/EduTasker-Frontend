document.getElementById("projectForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const deadline = document.getElementById("deadline").value;
    const assignedStudents = document.getElementById("assignedStudents").value;

    // Convert "1,2,3" → [1,2,3]
    const studentIds = assignedStudents.split(",").map(id => Number(id.trim()));

    const projectData = {
        title: title,
        description: description,
        deadline: deadline,
        assignedStudentIds: studentIds
    };

    console.log("Payload:", projectData);

    try {
        const response = await fetch("http://localhost:8080/Instructor/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            },
            body: JSON.stringify(projectData)
        });

        const messageEl = document.getElementById("responseMessage");

        if (response.ok) {
            messageEl.innerHTML = "✅ Project created successfully!";
            messageEl.classList = "text-green-600";

            document.getElementById("projectForm").reset();
        } else {
            messageEl.innerHTML = "❌ Failed to create project!";
            messageEl.classList = "text-red-600";
        }

    } catch (err) {
        alert("Error: " + err.message);
    }
});
function logout() {
    localStorage.removeItem("token");
    alert("logged out")
    window.location.href = "login.html";  // redirect to login page
}
