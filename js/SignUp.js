import { Users } from "./users.js";
import { Admins, admin } from "./Utils.js";

let regEmail = document.querySelector('.roll-inner-register-email')
let regPass = document.querySelector('.roll-inner-register-pass')
let regConf = document.querySelector('.roll-inner-register-confirm')
let regAccept = document.querySelector('.roll-inner-register-input')
let regist = document.querySelector('.roll-register-flex-btn')

regist.addEventListener('click', () => {
    if (regEmail.value.length !== 0 && regPass.value.length !== 0 && regConf.value.length !== 0 && regPass.value === regConf.value && regAccept.checked === true) {
        new Users().addAdmin({
            login: regEmail.value,
            password: regPass.value,
            id: Math.floor(Math.random() * 1000000)
        })
        localStorage.setItem('currentUser',JSON.stringify({
            login: regEmail.value,
            password: regPass.value,
        }))
    } else if (admin.find(admin => admin.login === regEmail.value)) {
        alert('You have already registered!');
    } else if (regEmail.value.length === 0 || regPass.value.length === 0 || regConf.value.length === 0 || regAccept.checked === false) {
        alert(`You did not write a password or email or you don't accept sign Up! Please check again`);
    } else if (regPass.value !== regConf.value) {
        alert(`Confirm your password`);
    }
});



let signEmail = document.querySelector('.roll-inner-form-email')
let signPass = document.querySelector('.roll-inner-form-pass')
let signIn = document.querySelector('.roll-inner-form-btn')

signIn.addEventListener('click', () => {
    console.log(admin.login);
    if (admin.find(admin => admin.login === signEmail.value) && admin.find(admin => admin.password === signPass.value)) {
        localStorage.setItem('currentUser', JSON.stringify({
            login: signEmail.value,
            password: signPass.value,
        }))
        alert(`Welcome ${signEmail.value}`)
        window.location.href = "../pages/index.html"
    }else{
        alert('You are not exist in this website!')
    }
})



