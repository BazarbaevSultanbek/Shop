import { Product } from "./Utils.js"
let firstCount = document.querySelector('.count-first')
let totalCount = document.querySelector('.count')
export class ProductInIndex {
    constructor() {
        this.product = new Product().productsFromLocalStorage()
        this.listItems = document.querySelector('.korzinka-hover-ul')
    }
    renderProductInHover(product) {
        product.forEach((item) => {
            this.listItems.insertAdjacentHTML('beforeend', `
            <li id="${item.id}" class="korzinka-hover-ul-li">
            <img src="${item.img}"> 
           <input type="number" id="hoverDec" value="${item.count}">
            <button id="hoverDel">delete</button>   
            </li>
            `)
        })
        firstCount.textContent = `${this.totalCount(product)} items`
        totalCount.textContent = `Total:${this.totalCount(product)}`
    }
    addItem(name, img, price) {
        const items = {
            name: name,
            img: img,
            price: price,
            discount: '-$20',
            count: 1,
            id: Math.floor(Math.random() * 1000000)
        };

        if ((this.product)) {
            const existCount = this.product.find((item) => item.img === img);
            if (existCount) {
                existCount.count++;
                localStorage.setItem("products", JSON.stringify(this.product));
                window.location.reload()
            } else {
                this.product.push(items);
                localStorage.setItem("products", JSON.stringify(this.product));
                window.location.reload()
            }
        } else {
            this.product = [items];
            localStorage.setItem("products", JSON.stringify(this.product));
        }

    }
    getImgForProduct(img){
        let findImg = this.product.filter((item)=>item.id == id)
        img = findImg[0].img
    }
    totalCount(product) {
        let totalCount = 0; 
    
        for (const total of product) {
            totalCount += total.count; 
        }
    
        return totalCount;
    }
    getAndChangeItem(id, count) {
        let getItem = this.product.filter((item) => item.id == id)
        getItem[0].count = count
        localStorage.setItem("products", JSON.stringify(this.product));
    }
    deleteItem(id) {
        const filterItem = this.product.filter((item) => item.id != id);
        this.listItems.innerHTML = ''
        localStorage.setItem('products', JSON.stringify(filterItem));
        this.renderProductInHover(filterItem);
    }
}










