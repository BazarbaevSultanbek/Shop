import { Cart } from "./Utils.js"


const firstCount = document.querySelector('.count-first')
const totalCount = document.querySelector('.count')

export class ProductInIndex {
    constructor() {
        this.cart = new Cart().cartFromLocalStorage()
        this.listItems = document.querySelector('.korzinka-hover-ul')
    }

    // render HTML in index.html
    renderProductInHover(product) {
        product.forEach((item) => {
            this.listItems.insertAdjacentHTML('beforeend', `
            <li id="${item.id}" class="korzinka-hover-ul-li">
            <img src="${item.img}"> 
           <input type="number" id="hoverDec" value="${item.count}" min="0">
            <button id="hoverDel">delete</button>   
            </li>
            `)
        })
        firstCount.textContent = `${this.totalCount(product)} items`
        totalCount.textContent = `Total:£${this.totalPrice(product)}`
    }

    // add Item from under the photo
    addItem(name, img, price) {
        const items = {
            name: name,
            img: img,
            price: price,
            discount: '-£20',
            count: 1,
            id: Math.floor(Math.random() * 1000000)
        };

        if ((this.cart)) {
            const existCount = this.cart.find((item) => item.img === img);
            if (existCount) {
                existCount.count++;
                localStorage.setItem("Cart", JSON.stringify(this.cart));
                window.location.reload()
            } else {
                this.cart.push(items);
                localStorage.setItem("Cart", JSON.stringify(this.cart));
                window.location.reload()
            }
        } else {
            this.cart = [items];
            localStorage.setItem("Cart", JSON.stringify(this.cart));
        }

    }

    // total Count
    totalCount(product) {
        let totalCount = 0; 
    
        for (const total of product) {
            totalCount += parseInt(total.count);
        }
    
        return totalCount;
    }

    // total Price
    totalPrice(products){

        let totalPrice = 0;

        for(const product of products){
            let price = JSON.parse(product.price.replace('£', '')); 
            totalPrice += price;
            totalPrice += price * product.count;
        }

        return totalPrice;
    }

    // change item count
    getAndChangeItem(id, count) {
        let getItem = this.cart.filter((item) => item.id == id)
        getItem[0].count = count
        localStorage.setItem("Cart", JSON.stringify(this.cart));
    }

    // function removing
    deleteItem(id) {
        const filterItem = this.cart.filter((item) => item.id != id);
        this.listItems.innerHTML = ''
        localStorage.setItem('Cart', JSON.stringify(filterItem));
        this.renderProductInHover(filterItem);
    }
}










