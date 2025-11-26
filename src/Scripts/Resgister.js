const form=document.getElementById("form");
form.addEventListener("submit",(e)=>{
    e.preventDefault();
    const username=document.getElementById("Username").value;
    const email=document.getElementById("email").value;
    const role=document.getElementById("role").value;
    const password=document.getElementById("password").value;

    const data ={
                name:username,
                email:email,
                role:role,
                password:password
            };
    fetch("http://localhost:8080/auth/register",{
            method:"post",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(data)
    }).then(async (res) => {

        if (res.ok) {
            alert("Registration Successful!");
            window.location.href ="/src/Pages/StudentLogin.html";   //Redirect her
        } else {
            const errorMsg = await res.text();
            alert("Registration failed: " + errorMsg);
        }

    })
    .catch(err => {
        console.error(err);
        alert("Something went wrong!");
    });
    

})
    
   