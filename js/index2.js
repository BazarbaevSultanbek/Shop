
// import of other classes
import { ProductInIndex } from "./index.js";
import { Cart, CurrentUser, Order } from "./Utils.js";

const products = new Cart().cartFromLocalStorage();
const currentUser = new CurrentUser().getCurrentUser()
new ProductInIndex().renderProductInHover(products)


// properties for take some elements from index.js
let imgId;
let price;
let name;
let count = 0


// connections with HTML classes
let firstCount = document.querySelector('.count-first')
let totalCount = document.querySelector('.count')
let buyItems = document.querySelector('#buyItems')
let clearCart = document.querySelector('#clear')
let modul = document.querySelector('.modul')
let listItems = document.querySelector('.korzinka-hover-ul')
let naviBlock = document.querySelector('.navigate-block')
let permLink = document.querySelector('#permLink')
let permLinkOut = document.querySelector('.header-top-inner-flex')
let logout = document.querySelector('#logOut')
// Link for permission to only admin
if (currentUser.login === 'admin' && currentUser.password == 'admin') {
    permLink.style.display = 'block'
    if (window.innerWidth >= 1024) {
        permLinkOut.style.width = '450px';
    }
}
if(currentUser.length !== 0){
    logout.style.display = 'block'
    logout.addEventListener('click',()=>{
        localStorage.removeItem("currentUser")
        localStorage.removeItem("Cart")
        count = 0
        firstCount.innerHTML = `${count} items`
        totalCount.innerHTML = `Total:${count}`
        window.location.href = '../pages/signUp.html'

        if (window.innerWidth >= 1024) {
            permLinkOut.style.width = '450px !important';
        }
    })
    if(currentUser.login == 'admin' && currentUser.password == 'admin'){
        permLinkOut.style.gap = '30px';
    }
}

// navigators under photos
naviBlock.addEventListener('click', (event) => {
    if (currentUser.length != 0) {
        if (event.target.id == 'order') {
            price = event.target.closest('.navigate-block-inner').querySelector('.price').textContent
            imgId = event.target.closest('.navigate-block-inner').querySelector('.img').getAttribute('src');
            name = event.target.closest('.navigate-block-inner').querySelector('.name-product').id
            if (products.find((item) => item.img === imgId)) {
                alert('Product already exists in your order.');
            } else {
                new ProductInIndex().addItem(name, imgId, price);
            }

        }
        if (event.target.id == 'booking') {
            const imgSrc = event.target.closest('.navigate-block-inner').querySelector('.img').getAttribute('src');
            name = event.target.closest('.navigate-block-inner').querySelector('.name-product').id
            price = event.target.closest('.navigate-block-inner').querySelector('.price').textContent
            localStorage.setItem('selectedImgSrc', JSON.stringify({
                img: imgSrc,
                name: name,
                price: price
            }))
            window.location.href = '../pages/product.html';
        }
    } else {
        alert("Without authorization")
        window.location.href = '../pages/signUp.html'
    }
})


// total counts of all items and prices
firstCount.innerHTML = `${new ProductInIndex().totalCount(products)} items`
totalCount.innerHTML = `Total:£${new ProductInIndex().totalPrice(products)}`;


// delete and add item in hover
listItems.addEventListener('click', (e) => {
    if (e.target.id == 'hoverDec') {
        let id = e.target.closest('.korzinka-hover-ul-li').id
        let closeCount = e.target.closest('.korzinka-hover-ul-li').querySelector('#hoverDec').value
        new ProductInIndex().getAndChangeItem(id, closeCount);
        firstCount.innerHTML = `${new ProductInIndex().totalCount(products)} items`
        totalCount.innerHTML = `Total:£${new ProductInIndex().totalPrice(products)}`;
    }
    if (e.target.id == 'hoverDel') {
        let id = e.target.closest('.korzinka-hover-ul-li').id
        new ProductInIndex().deleteItem(id)
    }

})


// delete all items that customer wanted to buy
clearCart.addEventListener('click', () => {
    if (listItems.innerHTML != '') {
        count = 0
        firstCount.innerHTML = `${count} items`
        totalCount.innerHTML = `Total:${count}`
        localStorage.removeItem("Cart")
        window.location.reload()
    }
})


// buy items in hover
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
            <label for="nameModul">Name</label>
            <input type="text" id="nameModul">
            <label for="numberModul">Phone number</label>
            <input type="tel" id="numberModul" placeholder="+X XXXXXXXX">
            <div class="modul-middle-btn">
                <button id="cancel">Cancel</button>
                <button id="save">Buy</button>
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
            if (tel.value.length != 0) {
                new Order().addOrder({
                    name: name.value,
                    number: tel.value,
                    orderNumber: new Cart().cartFromLocalStorage(),
                    id: Math.floor(Math.random() * 1000000)
                })
                alert('Thank you for your purchase!')
                window.location.reload()
                localStorage.removeItem("Cart")
            } else {
                alert("Please enter valid phone")
            }
        })
    }
})