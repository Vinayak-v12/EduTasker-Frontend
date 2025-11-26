const form = document.getElementById("form");

form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();

    const data = {
        email: email,
        password: password,
        role:"Instructor"
    };

    fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    })
        .then(async (res) => {
            if (res.ok) {
                const responseBody = await res.json();

                // Example response: { "token": "jwt-token-here" }
                const token = responseBody.Token;

                if (!token) {
                    alert("Invalid response from server. Token not received.");
                    return;
                }

                // Save token to localStorage
                localStorage.setItem("token", token);
                localStorage.setItem("role", "INSTRUCTOR");

                alert("Login Successful!");

                // Redirect to dashboard
                window.location.href="/src/Pages/InsDashboard.html";
            } else {
                const errorMsg = await res.text();
                alert("Login failed: " + errorMsg);
            }
        })
        .catch((err) => {
            console.error("Fetch error:", err);
            alert("Unable to reach server.");
        });
});
