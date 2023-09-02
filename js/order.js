import { Cart, CurrentUser, Order } from "./Utils.js";

export class Orders {
    constructor() {
        this.order = new Order().ordersFromLocalStorage();
        this.main = document.querySelector('.main-inner-local');
        this.product = new Cart().cartFromLocalStorage();
        this.tableBody = document.querySelector('#ordersList');
        this.modul = document.querySelector('.modul')
    }

    render(order) {
        order.forEach((item) => {
            this.main.insertAdjacentHTML(
                'beforeend',
                `
                <li id="${item.id}" class="main-inner-table-li">
                    <p>${item.name}</p>
                    <a href="tel:${item.number}">${item.number}</a>
                    <button id="show">Show</button>
                    <button id="execute">Execute</button>
                </li>
                `
            );


        });
    }
    showButtonFunction(id) {
        const foundItem = this.order.filter(item => item.id == id);
        console.log(foundItem);

        const ordersList = document.querySelector('#ordersList');
        ordersList.innerHTML = ''
        foundItem.map(item => {
            item.orderNumber.forEach(element => {
                ordersList.insertAdjacentHTML('beforeend', `
                <tr>
                    <td id="productImg"><img src="${element.img}" alt=""></td>
                    <td>${element.name}</td>
                    <td>${element.price}</td>
                    <td>${element.id}</td>
                    <td>${element.count}</td>
                    <td>${element.discount}</td>
                </tr>
                `)
            })

        })
    }


    createCustomer(info) {
        let customers = JSON.parse(localStorage.getItem('orders')) || [];
        customers.push(info);
        localStorage.setItem('orders', JSON.stringify(customers));
    }
    deletecustomer(id) {
        let findCustomer = this.order.filter(item => { item.id != id })
        this.main.innerHTML = ''
        localStorage.setItem('orders', findCustomer)
        this.render(findCustomer)
    }
}

let main = document.querySelector('.main-inner-local');
let wrapper = document.querySelector('.wrapper')
let modul = document.querySelector('.modul')
main.addEventListener("click", (event) => {
    if (wrapper.style.minWidth <= 320 || wrapper.style.minWidth >= 1024) {
        if (event.target.id === "show") {
            let id = event.target.closest('.main-inner-table-li').id;
            modul.style.display = 'block'
            new Orders().showButtonFunction(id);
        }
    }
    if (event.target.id === 'execute') {
        let id = event.target.closest('.main-inner-table-li').id;
        new Orders().deletecustomer(id)
    }
});
modul.addEventListener('click', (event) => {
    if (event.target.classList.contains('exit')) {
        modul.style.display = 'none'
    }
})
let currentUser = new CurrentUser().getCurrentUser();
if (currentUser.login === 'admin' && currentUser.password === 'admin') {
    document.addEventListener('DOMContentLoaded', () => {
        new Orders().render(new Orders().order);
    });
} else {
    window.location.href = '../pages/index.html';
}
