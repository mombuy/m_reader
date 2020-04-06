const login_btn = document.querySelector(".login_btn");
const login_menu = document.querySelector(".login_menu");
const registration_btn = document.querySelector(".registration_btn");
const registration_menu = document.querySelector(".registration_menu");
const dark_background = document.querySelector(".dark_background");
const dark_background2 = document.querySelector(".dark_background2");
const body = document.querySelector("body");
const main_menu = document.querySelector(".main_menu");
const nerv = document.querySelector(".nerv");
const hidden_menu = document.querySelector(".hidden_menu ");
const navbar = document.querySelector(".navbar");

window.addEventListener("click", (e) => {
    if (e.target === login_btn) {
        open_menu(login_menu, registration_menu);
    } else if (e.target === registration_btn) {
        open_menu(registration_menu, login_menu);
    } else if (e.target === dark_background) {
        close_all();
    }
});

const open_menu = (open, close) => {
    navbar.style.zIndex = "10";
    dark_background.style.opacity = "1";
    dark_background.style.zIndex = "1";
    open.style.opacity = "1";
    open.style.zIndex = "1000";
    open.style.transform = "translateY(-100px)";
    close.style.opacity = "0";
    close.style.zIndex = "-100";
    close.style.transform = "translateY(0px)";
};

const close_all = () => {
    navbar.style.zIndex = "0";
    dark_background.style.opacity = "0";
    dark_background.style.zIndex = "-1000";
    registration_menu.style.opacity = "0";
    registration_menu.style.zIndex = "-1000";
    login_menu.style.transform = "translateY(0px)";
    login_menu.style.opacity = "0";
    login_menu.style.zIndex = "-1000";
    registration_menu.style.transform = "translateY(0px)";
};
