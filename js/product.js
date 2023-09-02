import {  ProductList } from "./Utils.js";


export class Products {
    constructor() {
        this.product = new ProductList().productListFromLocalStorage()
        this.footer = document.querySelector('.footer-inner-local')
    }
    // add product by connection with product2.js
    addProduct(data) {
        this.product = JSON.parse(localStorage.getItem("ProductList") || '[]');
        this.product.push(data)
        localStorage.setItem("ProductList", JSON.stringify(this.product))
        this.render(this.product)
    }

    // render HTML code in products.html
    render(product) {
        product.forEach((element) => {
            this.footer.insertAdjacentHTML(
                  'beforeend',
                `
         <li id="${element.id}" class="footer-inner-table-li">
         <img src="../img/${element.img}" alt="product photo">
         <p>${element.type}</p>
         <p>${element.price}</p>
         <p>${element.discount}</p>
                <div>
                <button class="edit">Change</button>
                <button class="delete">Delete</button>
                </div>
            </li>      
         `
            )
        });
    }

    // get element from localStorage for changing and removing
    getProducts(id) {
        let findProduct = this.product.filter((item) => item.id == id);
        return [findProduct[0].type, findProduct[0].price, findProduct[0].discount];
    }

    // function for editing
    editProducts(id, type, price, discount) {
        let findProduct = this.product.filter((item) => item.id == id)
        findProduct[0].type = type
        findProduct[0].price = price
        findProduct[0].discount = discount
        return this.product
    }


    // deleting function
    deleteProduct(id) {
        let filterProduct = this.product.filter((item) => item.id != id);
        this.footer.innerHTML = ""
        localStorage.setItem('ProductList', JSON.stringify(filterProduct))
        this.render(filterProduct)
    }
}