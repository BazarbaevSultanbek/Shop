// import of other classes
import { Products } from "./product.js";
import { CurrentUser, ProductList } from "./Utils.js";


// connections with HTML classes and id
const type = document.querySelector('#type')
const price = document.querySelector('#price')
const discount = document.querySelector('#discount')
const comment = document.querySelector('#desc')
const addProduct = document.querySelector('#add')
const footer = document.querySelector('.footer-inner-local')
const modul = document.querySelector('.modul')



const products = new ProductList().productListFromLocalStorage()
const currentUser = new CurrentUser().getCurrentUser()


// admin can open  this page
if (currentUser.login === 'admin' && currentUser.password === 'admin') {
    new Products().render(products);
} else {
    window.location.href = '../pages/index.html'
}


// add Product
addProduct.addEventListener('click', () => {
    if (type.value != "" && price != "" && discount != "" && comment.value != "") {
        new Products().addProduct({
            type: type.value,
            price: price.value,
            discount: discount.value,
            id: Math.floor(Math.random() * 1000000)
        })
        window.location.reload()
    }
    else if (type.value == "" || price.value == "" || discount.value == "" && comment.value == "") {
        alert("Please fill the gaps!");
    }
})


// change an exist product
footer.addEventListener('click', (e) => {
    if (e.target.classList.contains("edit")) {
        let id = e.target.closest(".footer-inner-table-li").id;
        let [name, price, discount] = new Products().getProducts(id)
        modul.style.backgroundColor = 'rgba(51, 49, 49, 0.74)'
        modul.style.height = '100vh'
        modul.innerHTML = `
            <div class="modul-middle">
            <p>Edit Product</p>
            <input type="text" id="typeModul" placeholder="type" value="${name}">
            <input type="text" id="priceModul" placeholder="Price" value="${price}">
            <input type="text" id="discModul" placeholder="Discount" value="${discount}">
            <div class="modul-middle-btn">
                <button id="cancel">Cancel</button>
                <button id="save">Save</button>
                </div>
                </div>
                `
        let cancelModul = document.querySelector('#cancel')
        let saveModul = document.querySelector('#save')
        let typeModul = document.querySelector('#typeModul')
        let priceModul = document.querySelector('#priceModul')
        let discModul = document.querySelector('#discModul')
        cancelModul.addEventListener('click', () => {
            modul.innerHTML = ""
            modul.style.background = 'none'
            modul.style.height = '0'
        })
        saveModul.addEventListener('click', () => {
            let edit = new Products().editProducts(id, typeModul.value, priceModul.value, discModul.value)
            new ProductList().saveProductListToLocalStorage(edit)
            modul.style.display = 'none'
            window.location.reload()
        })
    }
})


// delete an exist prodcuct
footer.addEventListener('click', (e) => {
    if (e.target.classList.contains("delete")) {
        let id = e.target.closest(".footer-inner-table-li").id
        new Products().deleteProduct(id)
    }
})


