/* BASE TEMPLATE JAVASCRIPT */
document.addEventListener('DOMContentLoaded', function () {
    elementsEvents();
    elementsAttributes();

});

function elementsEvents() {
    menuEvent();
    loginRegisterBtnEvent();
}

function elementsAttributes(){
    inputDateMax();
}

function inputDateMax() {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!
    let yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }

    today = yyyy + '-' + mm + '-' + dd;
    document.querySelector(".input-datepicker").setAttribute("max", today);
}


function menuEvent() {
    let menu = document.querySelector(".mobile-menu");
    let menuPages = document.querySelector("#mobile-menu-pages");

    menu.addEventListener("click", function (e) {
        e.preventDefault();
        this.classList.toggle('mobile-menu-close');
        if (menuPages.style.display == "flex") {
            menuPages.style.display = "none";
        } else {
            menuPages.style.display = "flex";
        }

    }, false);
}

function loginRegisterBtnEvent() {
    let loginBtn = document.querySelector("#btn-login-panel");
    let registerBtn = document.querySelector("#btn-register-panel");
    let loginPanel = document.querySelector("#login-panel");
    let registerPanel = document.querySelector("#register-panel");

    loginBtn.addEventListener("click", function (e) {
        e.preventDefault();
        if (loginBtn.className == "btn-not-selected") {
            loginBtn.className = "btn-selected";
            registerBtn.className = "btn-not-selected";
            registerPanel.style.display = "none";
            loginPanel.style.display = "flex";
        }
    });

    registerBtn.addEventListener("click", function (e) {
        e.preventDefault();
        if (registerBtn.className == "btn-not-selected") {
            registerBtn.className = "btn-selected";
            loginBtn.className = "btn-not-selected";
            registerPanel.style.display = "flex";
            loginPanel.style.display = "none";
        }
    });

}

