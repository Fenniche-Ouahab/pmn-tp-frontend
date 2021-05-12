if (localStorage.getItem("token") !== null) {
    var postList = document.querySelector(".listOfposts");
    let data = "";

    let xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            let response = JSON.parse(this.responseText);

            response.forEach((post) => {
                postList.innerHTML += `
                <div class="listOfposts_post">
                    <h2>${post.title}</h2> 
                    <p>${post.content}</p>
                </div>
            `;
            });
        }
    });

    xhr.open("GET", "http://localhost:3000/posts");
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.setRequestHeader("Authorization", localStorage.getItem('token'));

    xhr.send(data);

    document.querySelectorAll('.isLoggedOut').forEach((el) => {
        el.classList.add('hide');
    });
    document.querySelectorAll('.isLoggedIn').forEach((el) => {
        el.classList.remove('hide');

    });
}