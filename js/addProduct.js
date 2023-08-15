import { Products } from "./product.js";
import { Product } from "./Utils.js";

let typeProduct = document.querySelector('#typeProduct')
let priceProduct = document.querySelector('#priceProduct')
let discProduct = document.querySelector('#discProduct')
let addToCart = document.querySelector('#addCart')
addToCart.addEventListener('click', () => {
    if (typeProduct.value != "" && priceProduct != "" && discProduct != "") {
        new Product().addProduct({
            image:'shirt3.png',
            type: typeProduct.value,
            price: priceProduct.value,
            discount: discProduct.value,
            desc: 'Lorem ipsum',
            id: Math.floor(Math.random() * 1000000)
        })
        window.location.reload()
    }
})