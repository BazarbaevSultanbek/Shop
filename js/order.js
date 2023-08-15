import { Order } from "./Utils.js";


export class Orders {
    constructor() {
        this.order = new Order().ordersFromLocalStorage()
        this.main = document.querySelector('.main-inner-local')
    }
    render(order) {
        order.forEach((item) => {
            this.main.insertAdjacentHTML(
                'beforeend',
                `
             <li id="${item.id}" class="main-inner-table-li">
             <p>${item.name}</p>
             <p>${item.number}</p>
             <p>${item.orderNumber}</p>
            </li>      
             `
            )
        });
    }
    createCustomer(info) {
        let customers = JSON.parse(localStorage.getItem(('orders') || []));
        customers.push(info)
        localStorage.setItem('orders', JSON.stringify(customers))
    }
}

document.addEventListener('DOMContentLoaded',()=>{
    new Orders().render(new Order().ordersFromLocalStorage())
})