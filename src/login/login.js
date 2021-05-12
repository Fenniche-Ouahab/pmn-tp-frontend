const loginBtn = document.querySelector(".login-btn");
const showError = document.querySelector(".error-message");

const onSubmitForm = () => {
    console.log("ok")
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;

    var data = `email=${email}&password=${password}`;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            let response = JSON.parse(this.responseText);

            if (response.message) {
                // if error show error message
                alert("error")
                showError.textContent = response.message;
                showError.classList.remove("hide");
            }
            else {
                // if the authentication is successful, we store the token in the localStorage
                localStorage.setItem("token", response.token);
                // then we redirect to the posts page
                window.location.replace("../posts/allposts.html");
            }
        }
    });

    xhr.open("POST", "http://localhost:3000/user/login");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.send(data);
}

loginBtn.addEventListener("click", onSubmitForm);