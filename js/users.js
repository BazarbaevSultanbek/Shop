import { Admins, admin } from "./Utils.js"
export class Users {
    constructor() {
        this.admin = new Admins().adminsFromLocalStorage()
        this.navLocal = document.querySelector('.footer-nav-local')
        this.adminDelete = document.querySelector('#delete')
    }
    render() {
        this.admin.forEach((item) => {
            this.navLocal.insertAdjacentHTML(
                "beforeend",
                `
            <li id="${item.id}" class="footer-nav-local-li">
                <img src="../img/user.jpg" alt="user">
                <div>
                <p>${item.login}</p>
                <p>${item.password}</p>
                </div>
                <button class="edit">Change</button>
                <button class="delete">Delete</button>
            </li>         
                `
            )
        })
    }
    getAdmins(id) {
        let findAdmin = this.admin.filter((item) => item.id == id);
        return [findAdmin[0].login, findAdmin[0].password];
    }
    editAdmins(id, login, password){
        let findAdmin = this.admin.filter((item)=>item.id == id)
        findAdmin.login = login
        findAdmin.password = password
        localStorage.setItem('admins',JSON.stringify(this.admin))
        return 
        // this.render(this.admin)
    }
    deleteAdmin(id,login,password){
        let findAdmin = this.admin.filter((item)=>item.id == id)
    }
}

new Users().render()

