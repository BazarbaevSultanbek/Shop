import { addAdmin, Admins, admin } from "./Utils.js"
// import 
class Register {
    constructor() {
        this.regEmail = document.querySelector('.roll-inner-register-email')
        this.regPass = document.querySelector('.roll-inner-register-pass')
        this.regConf = document.querySelector('.roll-inner-register-confirm')
        this.regAccept = document.querySelector('.roll-inner-register-input')
        this.regist = document.querySelector('.roll-register-flex-btn')
    }
    registForm() {
        this.regist.addEventListener('click', () => {
            if (this.regEmail.value != "" && this.regPass != "" && this.regConf != "" && this.regAccept.checked == true) {
                addAdmin(this.regEmail.value, this.regPass.value)
                new Admins().saveAdminsToLocalStorage(admin);
                new Admins().adminsFromLocalStorage();
            } else if (admin.find(admin => admin.login === this.regEmail.value)) {
                alert('You have already registered!');
            } else if (this.regEmail.value == '' || this.regPass.value == '' || this.regConf == '' || this.regAccept.checked == false) {
                alert(`You did not write password or email or you don't accept sign Up! Please check again`)
            }
        })
    }

}
new Register().registForm()

class Sign {
    constructor() {
        this.signEmail = document.querySelector('.roll-inner-form-email')
        this.signPass = document.querySelector('.roll-inner-form-pass')
        this.signIn = document.querySelector('.roll-inner-form-btn')
    }
    signForm() {
        this.signIn.addEventListener('click', () => {
            if (this.signEmail.value === admin.login && this.signPass === admin.password){

            }
        })
    }
}

new Sign().signForm()

