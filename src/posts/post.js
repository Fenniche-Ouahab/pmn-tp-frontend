const submitBtn = document.querySelector(".post-btn");
const errorMsg = document.querySelector(".error-message");

// Décodage du token
let token = localStorage.getItem("token");
let token_payload = JSON.parse(atob(token.split('.')[1]));
let userRole = token_payload.user.role;

// On vérifie que l'utilisateur est connecté et qu'il est admin
if (localStorage.getItem("token") !== null) {
    if (userRole === "admin") {
        const onSubmitForm = () => {
            // On récupère les valeurs des champs du formulaire
            const titleValue = document.querySelector("#title").value;
            const contentValue = document.querySelector("#content").value;

            var data = `title=${titleValue}&content=${contentValue}`;

            var xhr = new XMLHttpRequest();
            xhr.withCredentials = true;

            xhr.addEventListener("readystatechange", function () {
                if (this.readyState === 4) {
                    let response = JSON.parse(this.responseText);

                    if (response.message) {
                        // show error message
                        errorMsg.textContent = response.message;
                        errorMsg.classList.remove("hide");
                    }
                    else {
                        // show a validation message
                        document.querySelector('.main').innerHTML += `
                        <p class="validation-message">Your post has been published</p>
                    `;
                        document.location.href = "http://localhost/posts/allposts.html";
                    }
                }
            });

            xhr.open("POST", "http://localhost:3000/posts");
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
            xhr.setRequestHeader("Authorization", localStorage.getItem('token'));

            xhr.send(data);
        }

        document.querySelectorAll('.isLoggedOut').forEach((el) => {
            el.classList.add('hide');
        });
        document.querySelectorAll('.isLoggedIn').forEach((el) => {
            el.classList.remove('hide');
        });

        submitBtn.addEventListener("click", onSubmitForm);
    }

    else {
        document.querySelectorAll('.isLoggedOut').forEach((el) => {
            el.classList.add('hide');
        });
        document.querySelectorAll('.isNotAdmin').forEach((el) => {
            el.classList.remove('hide');
        });
        document.querySelector(".isNotAdmin2").innerHTML += `
        <p><a href="http://localhost/posts/allposts.html">Show all posts!</a></p>
      `;

    }
}