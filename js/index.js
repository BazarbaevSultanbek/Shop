import { Products } from "./product.js";
import { Orders } from "./order.js";

const navigateBlock = document.querySelector('.navigate-block-inner-focus');
let imgId;
let price;
const navigateInner = document.querySelectorAll('.navigate-block-inner')
navigateInner.forEach(navigateBlock => {
    navigateBlock.addEventListener('click', (e) => {
        if (e.target.id == "booking") {
            imgId = e.target.closest(".navigate-block-inner-focus").id;
            price = e.target.closest('.navigate-block-inner').querySelector('.price').id;
            new Products().addProductFromIndex({
                image: imgId,
                type: 'T-shirt',
                price: price,
                discount: '-$2%',
                dec: 'Cloth',
                id: Math.floor(Math.random() * 1000000)
            })
        }
    })
})

let count = 0
let firstCount = document.querySelector('.count-first')
let totalCount = document.querySelector('.count')
let clearCart = document.querySelector('#clear')
let buyItems = document.querySelector('#buyItems')
let modul = document.querySelector('.modul')
navigateInner.forEach(navigateBlock => {
    navigateBlock.addEventListener('click', (e) => {
        if (e.target.id == "order") {
            count++
            firstCount.innerHTML = `${count} items`
            totalCount.innerHTML = `Total:${count}`
        }
    })
})
clearCart.addEventListener('click', () => {
    count = 0
    firstCount.innerHTML = `${count} items`
    totalCount.innerHTML = `Total:${count}`
})
buyItems.addEventListener('click', () => {
    modul.style.backgroundColor = 'rgba(51, 49, 49, 0.74)'
    modul.style.height = '100vh'
    modul.innerHTML = `
        <div class="modul-middle">
        <p>Create Customer</p>
        <input type="text" id="nameModul" placeholder="name">
        <input type="tel" id="numberModul" placeholder="+1 12345678">
        <input type="number" id="orderModul" placeholder="orderNumber" value="${count}">
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
    let orderModul = document.querySelector('#orderModul')
    cancelModul.addEventListener('click', () => {
        modul.innerHTML = ""
        modul.style.background = 'none'
        modul.style.height = '0'
    })
    saveModul.addEventListener('click', () => {
        if (tel.value.length == 11){
            new Orders().createCustomer({
                name: name.value,
                number: tel.value,
                orderNumber: orderModul.value,
                id: Math.floor(Math.random() * 1000000)
            })
        window.location.reload()
        }else{
            alert("Please enter valid phone")
        }
    })
})




