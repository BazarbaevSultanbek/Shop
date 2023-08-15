import { Product } from "./Utils.js";
export class Products {
    constructor() {
        this.product = new Product().productsFromLocalStorage()
        this.footer = document.querySelector('.footer-inner-local')
    }
    addProduct(data) {
        this.product = JSON.parse(localStorage.getItem("products") || '[]');
        this.product.push(data)
        localStorage.setItem("products", JSON.stringify(this.product))
        this.render(this.product)
    }
    addProductFromIndex(data) {
        this.product = JSON.parse(localStorage.getItem("products") || '[]');
        this.product.push(data)
        localStorage.setItem("products", JSON.stringify(this.product))
    }
    render(product) {
        product.forEach((element) => {
            this.footer.insertAdjacentHTML(
                  'beforeend',
                `
         <li id="${element.id}" class="footer-inner-table-li">
         <img src="../img/${element.image}" alt="product photo">
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
    getProducts(id) {
        let findProduct = this.product.filter((item) => item.id == id);
        return [findProduct[0].type, findProduct[0].price, findProduct[0].discount];
    }
    editProducts(id, type, price, discount) {
        let findProduct = this.product.filter((item) => item.id == id)
        findProduct[0].type = type
        findProduct[0].price = price
        findProduct[0].discount = discount
        return this.product
    }

    deleteProduct(id) {
        let filterProduct = this.product.filter((item) => item.id != id);
        this.footer.innerHTML = ""
        localStorage.setItem('products', JSON.stringify(filterProduct))
        this.render(filterProduct)
    }
}