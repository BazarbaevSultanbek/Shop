import { Users } from "./users.js";
import { Admins, admin } from "./Utils.js";

const navLocal = document.querySelector('.footer-nav-local')
const editAdmin = document.querySelector('#edit')
const deleteAdmin = document.querySelector("delete")
const modul = document.querySelector('.modul')

navLocal.addEventListener('click', (e) => {
    if (e.target.classList.contains("edit")) {
        let id = e.target.closest(".footer-nav-local-li").id;
        let [login, password] = new Users().getAdmins(id);
        modul.style.backgroundColor = 'rgba(51, 49, 49, 0.74)'
        modul.style.height = '100vh'
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
            console.log(loginModul.value);
            new Users().editAdmins(id, loginModul.value, passModul.value) 
            navLocal.style.display = 'none'          
        })
    }
})
