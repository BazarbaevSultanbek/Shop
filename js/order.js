import { ProductInIndex } from "./index.js";
import { Order, Product } from "./Utils.js";


export class Orders {
    constructor() {
        this.order = new Order().ordersFromLocalStorage()
        this.main = document.querySelector('.main-inner-local')
        this.product = new Product().productsFromLocalStorage()
    }
    render(order) {
        order.forEach((item) => {
            this.main.insertAdjacentHTML(
                'beforeend',
                `
             <li id="${item.id}" class="main-inner-table-li">
             <p>${item.name}</p>
             <a href="tel:${item.number}">${item.number}</a>
             <p>${new ProductInIndex().totalCount(this.product)}</p>
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