document.addEventListener("DOMContentLoaded", loadSubmissions);

const token = localStorage.getItem("token");

function loadSubmissions() {
    fetch("http://localhost:8080/Instructor/submissions", {
        headers: { "Authorization": "Bearer " + token }
    })
        .then(res => res.json())
        .then(res => {
            const list = res;
            const container = document.getElementById("submissionContainer");
            container.innerHTML = "";

            list.forEach(s => {
                container.innerHTML += `
                    <div class="p-4 bg-white rounded shadow">
                        <p><strong>Project:</strong> ${s.projectTitle}</p>
                        <p><strong>Student:</strong> ${s.studentName}</p>
                        <p><strong>Content:</strong> ${s.content}</p>

                        <textarea id="fb-${s.id}" class="w-full border p-2 mt-2"
                                  placeholder="Write feedback"></textarea>

                        <input id="gr-${s.id}" class="border p-2 mt-2 w-full"
                               placeholder="Grade (A / B / C / etc.)"/>

                        <button onclick="submitReview(${s.id}, ${s.projectId})"
                                class="mt-2 bg-green-600 text-white p-2 rounded">
                            Submit Review
                        </button>
                    </div>`;
            });
        });
}

function submitReview(submissionId, projectId) {
    const dto = {
        submissionId: submissionId,
        feedback: document.getElementById(`fb-${submissionId}`).value,
        grade: document.getElementById(`gr-${submissionId}`).value,
        is_graded:true
    };

    fetch(`http://localhost:8080/Instructor/project/${projectId}/review`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + token
        },
        body: JSON.stringify(dto)
    })
        .then(res => res.json())
        .then(() => {
            alert("Review submitted!");
            loadSubmissions();
        });
}
