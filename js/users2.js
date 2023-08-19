import { Users } from "./users.js";
import { Admins, admin } from "./Utils.js";

const navLocal = document.querySelector('.footer-nav-local')
const modul = document.querySelector('.modul')
const regist = document.querySelector("#register")
const regLogin = document.querySelector("#login")
const regPass = document.querySelector("#password")
const regConf = document.querySelector("#confirm")

let admins = new Admins().adminsFromLocalStorage()
new Users().render(admins)
regist.addEventListener('click', () => {
    if (regLogin.value != 0  && regLogin.value.length == 13 && regPass.value != 0 && regConf.value != 0 && regPass.value === regConf.value) {
        new Users().addAdmin({
            login: regLogin.value,
            password: regPass.value,
            id: Math.floor(Math.random() * 1000000)
        })
        window.location.reload()
    } else if (admin.find(admin => admin.login === regLogin.value)) {
        alert('You have already registered!');
    }
    else if (regLogin.value == "" || regPass.value == "" || regConf.value == "") {
        alert("Please add login and password !");
    } else if (regLogin.value != 0 && regPass.value != 0 && regConf.value != 0 && regPass.value != regConf.value) {
        alert("Confirm your password correctly!")
    }
})
navLocal.addEventListener('click', (e) => {
    if (e.target.classList.contains("edit")) {
        let id = e.target.closest(".footer-nav-local-li").id;
        let [login, password] = new Users().getAdmins(id);
        modul.style.backgroundColor = 'rgba(51, 49, 49, 0.74)'
        modul.style.height = '100vh'
        modul.style.top = '0'
        modul.style.right = '0'
        modul.style.left = '0'
        modul.style.bottom = '0'
        modul.innerHTML = `
            <div class="modul-middle">
            <p>Edit Admin</p>
            <input type="text" id="loginModul" placeholder="Login" value="${login}">
            <input type="text" id="passModul" placeholder="Password" value="${password}">
            <div class="modul-middle-btn">
                <button id="cancel">Cancel</button>
                <button id="save">Save</button>
                </div>
                </div>
                `
        let cancelModul = document.querySelector('#cancel')
        let saveModul = document.querySelector('#save')
        let loginModul = document.querySelector('#loginModul')
        let passModul = document.querySelector('#passModul')
        cancelModul.addEventListener('click', () => {
            modul.innerHTML = ""
            modul.style.background = 'none'
            modul.style.height = '0'
        })
        saveModul.addEventListener('click', () => {
           if(loginModul.value.length == 13){
            let edit = new Users().editAdmins(id, loginModul.value, passModul.value)
            new Admins().saveAdminsToLocalStorage(edit)
            modul.style.display = 'none'
            window.location.reload()
           }else {
            alert("Please enter the login more than 13 word")
           }
           
        })
    }
})
navLocal.addEventListener('click', (e) => {
    if (e.target.classList.contains("delete")) {
        let id = e.target.closest(".footer-nav-local-li").id
        new Users().deleteAdmin(id)
    }
})
