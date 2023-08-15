import { Admins } from "./Utils.js"
export class Users {
    constructor() {
        this.admin = new Admins().adminsFromLocalStorage()
        this.navLocal = document.querySelector('.footer-nav-local')
    }
    addAdmin(info){
        this.admin = JSON.parse(localStorage.getItem("admins") || "[]");
        this.admin.push(info)
        localStorage.setItem("admins", JSON.stringify(this.admin))
        this.render(this.admin)
    }
    render(admin) {
        admin.forEach((item) => {
            this.navLocal.insertAdjacentHTML(
                "beforeend",
                `
            <li id="${item.id}" class="footer-nav-local-li">
                <img src="../img/user.jpg" alt="user">
                <p>${item.login}</p>
                <div>
                <button class="edit">Change</button>
                <button class="delete">Delete</button>
                </div>
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
        findAdmin[0].login = login
        findAdmin[0].password = password
        // this.render(this.admin)
        return this.admin
    }

    deleteAdmin(id){
        let filterAdmin = this.admin.filter((item) => item.id != id);        
        this.navLocal.innerHTML = ""
        localStorage.setItem('admins', JSON.stringify(filterAdmin))
        this.render(filterAdmin)
    }
}

