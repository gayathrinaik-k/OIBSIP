// REGISTER

let registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", function(e) {

        e.preventDefault();

        let name = document.getElementById("name").value;
        let email = document.getElementById("email").value;
        let password = document.getElementById("password").value;

        if (password.length < 8) {

            document.getElementById("error").innerText =
                "Password must contain at least 8 characters.";

            return;
        }

        localStorage.setItem("name", name);
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);

        alert("Account created successfully!");

        window.location.href = "index.html";
    });
}


// LOGIN

let loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function(e) {

        e.preventDefault();

        let email =
            document.getElementById("loginEmail").value;

        let password =
            document.getElementById("loginPassword").value;

        let savedEmail =
            localStorage.getItem("email");

        let savedPassword =
            localStorage.getItem("password");

        if (email === savedEmail &&
            password === savedPassword) {

            alert("Login successful!");

            window.location.href = "dashboard.html";

        } else {

            document.getElementById("loginError").innerText =
                "Invalid email or password.";
        }
    });
}
