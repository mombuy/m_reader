let boo = false;

document.getElementById("submit").addEventListener("click", (e) => {
    e.preventDefault();
    let registration = document.forms["reg-form"];
    let name = registration.elements["name"].value;
    let password = registration.elements["password"].value;
    let email = registration.elements["email"].value;

    let user = JSON.stringify({
        name: name,
        password: password,
        email: email,
    });
    let request = new XMLHttpRequest();
    request.open("POST", "/registration-process", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", async () => {
        const received_user = JSON.parse(request.response);
        if (received_user) {
            user = {
                name: name,
                password: password,
                email: email,
            };
            is_empty(user);
            if (!boo) {
                alert("user exist");
            }
        } else {
            window.location.href = window.location.href;
        }
    });
    request.send(user);
});

document.getElementById("sign_in_submit").addEventListener("click", (e) => {
    e.preventDefault();
    let registration = document.forms["log-form"];
    let name = registration.elements["name"].value;
    let password = registration.elements["password"].value;

    let user = JSON.stringify({
        name: name,
        password: password,
    });
    let request = new XMLHttpRequest();
    request.open("POST", "/req-page-progress", true);
    request.setRequestHeader("Content-Type", "application/json");
    request.addEventListener("load", async () => {
        const received_user = JSON.parse(request.response);
        if (!received_user) {
            document.querySelector(".error_sign_in").style.display = "block";
        } else {
            window.location.href = window.location.href;
        }
    });
    request.send(user);
});

const error = (label, input) => {
    label.style.color = "red";
    input.style.borderColor = "red";
};

const lockout_submit = (button) => {
    let old_value = button.value;

    button.setAttribute("disabled", true);
    button.value = "processing";

    setTimeout(function () {
        button.value = old_value;
        button.removeAttribute("disabled");
    }, 3000);
};

const is_empty = (reg_user) => {
    for (let i in reg_user) {
        if (reg_user[i] === "") {
            boo = true;
            alert(i + " is empty");
        } else {
            verify(i, reg_user[i]);
        }
    }
};

const verify = (i, reg_user) => {
    switch (i) {
        case "name":
            if (reg_user.length < 4) {
                alert("name < 4");
                boo = true;
            }
            break;
        case "password":
            if (reg_user.length < 8) {
                alert("password < 8");
                boo = true;
            }
            break;
        case "email":
            if (reg_user.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi) === null) {
                alert("email + @email.domain");
                boo = true;
            }
            break;
    }
    return boo;
};
