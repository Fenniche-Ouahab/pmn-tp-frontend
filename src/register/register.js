function uncheck() {
    var a = uncheck.arguments, z0 = 0;
    for (; z0 < a.length; z0++) {
        document.getElementById(a[z0]) ? document.getElementById(a[z0]).checked = false : null;
    }
}




const registerBtn = document.querySelector(".signIn");
const showError = document.querySelector(".error-message");
const showSucces = document.querySelector(".validation-message");



const onSubmitForm = () => {
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    const roles = document.querySelectorAll('input[name="one-role"]:checked');
    const role = [];


    roles.forEach((checkbox) => {
        role.push(checkbox.value);
    });

    var data = `email=${email}&password=${password}&role=${role}`;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            let response = JSON.parse(this.responseText);

            if ((response.message).includes("Erreur")) {
                showError.textContent = `${response.message} : email already used!`;
                showError.classList.remove("hide");
            }
            else {
                document.querySelector(".info-message").classList.add("hide");
                document.querySelector(".container").innerHTML += `
            <p>${response.message}</p>
            <p><a href="http://localhost/">Connect now !</a></p>
          `;
            }
        }
    });


    xhr.open("POST", "http://localhost:3000/user/register");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    xhr.send(data);
}

registerBtn.addEventListener("click", onSubmitForm);


