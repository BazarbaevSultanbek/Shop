import { ProductInIndex } from "./index.js";
import { Orders } from "./order.js";
import { CurrentUser, Product } from "./Utils.js";

const currentUser = new CurrentUser().getCurrentUser()
const products = new Product().productsFromLocalStorage()
new ProductInIndex().renderProductInHover(products)

let imgId;
let price;
let name;
let count = 0


let firstCount = document.querySelector('.count-first')
let totalCount = document.querySelector('.count')
let buyItems = document.querySelector('#buyItems')
let clearCart = document.querySelector('#clear')
let modul = document.querySelector('.modul')
let listItems = document.querySelector('.korzinka-hover-ul')
let naviBlock = document.querySelector('.navigate-block')






naviBlock.addEventListener('click', (event) => {
   if(currentUser.length != 0){
    if (event.target.id == 'order') {
        price = event.target.closest('.navigate-block-inner').querySelector('.price').textContent
        imgId = event.target.closest('.navigate-block-inner').querySelector('.img').getAttribute('src');
        let name = event.target.closest('.navigate-block-inner').querySelector('.name-product').id
        new ProductInIndex().addItem(name,imgId, price)
    }
    if (event.target.id == 'booking') {
        const imgSrc = event.target.closest('.navigate-block-inner').querySelector('.img').getAttribute('src');
        localStorage.setItem('selectedImgSrc', imgSrc)
        window.location.href = '../pages/product.html';

    }
   }else{
    alert("Without authorization")
    window.location.href = '../pages/signUp.html'
   }
})

firstCount.innerHTML = `${new ProductInIndex().totalCount(products)} items`
totalCount.innerHTML = `Total:${new ProductInIndex().totalCount(products)}`


listItems.addEventListener('click', (e) => {
    if (e.target.id == 'hoverDec') {
        let id = e.target.closest('.korzinka-hover-ul-li').id
        let closeCount = e.target.closest('.korzinka-hover-ul-li').querySelector('#hoverDec').value
        new ProductInIndex().getAndChangeItem(id, closeCount);
    }
    if (e.target.id == 'hoverDel') {
        let id = e.target.closest('.korzinka-hover-ul-li').id
        new ProductInIndex().deleteItem(id)
    }

})
clearCart.addEventListener('click', () => {
    count = 0
    firstCount.innerHTML = `${count} items`
    totalCount.innerHTML = `Total:${count}`
    localStorage.removeItem("products")
    window.location.reload()
})
buyItems.addEventListener('click', () => {
    if (products.length !== 0) {
        modul.style.backgroundColor = 'rgba(51, 49, 49, 0.74)'
        modul.style.height = '100vh'
        modul.style.top = '0'
        modul.style.right = '0'
        modul.style.left = '0'
        modul.style.bottom = '0'
        modul.innerHTML = `
            <div class="modul-middle">
            <p>Create Customer</p>
            <input type="text" id="nameModul" placeholder="name">
            <input type="tel" id="numberModul" placeholder="+X XXXXXXXX">
            <div class="modul-middle-btn">
                <button id="cancel">Cancel</button>
                <button id="save">Save</button>
                </div>
                </div>
                `
        let cancelModul = document.querySelector('#cancel')
        let saveModul = document.querySelector('#save')
        let name = document.querySelector('#nameModul')
        let tel = document.querySelector('#numberModul')
        cancelModul.addEventListener('click', () => {
            modul.innerHTML = ""
            modul.style.background = 'none'
            modul.style.height = '0'
        })
        saveModul.addEventListener('click', () => {
            if (tel.value.length == 11) {
                new Orders().createCustomer({
                    name: name.value,
                    number: tel.value,
                    orderNumber: new ProductInIndex().totalCount(new Product().productsFromLocalStorage()),
                    id: Math.floor(Math.random() * 1000000)
                })
                window.location.href = '../pages/orders.html'
            } else {
                alert("Please enter valid phone")
            }
        })
    }
})