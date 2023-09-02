import { ProductInIndex } from "./index.js";
import { Cart } from "./Utils.js";


const imgSrc = JSON.parse(localStorage.getItem('selectedImgSrc'));
const productDiv = document.querySelector('#product');

if (imgSrc && imgSrc.length !== 0) {
  productDiv.innerHTML = `<img src="${imgSrc.img}" alt="cloth">`;
}

const addProduct = document.querySelector('#addCart')


addProduct.addEventListener('click', () => {
  new ProductInIndex().addItem(imgSrc.name, imgSrc.img, imgSrc.price);
})


const radioButtons = document.querySelectorAll('.product-block-input input[type="radio"]');
const infoSections = document.querySelectorAll('.product-block-info-inner');
const labels = document.querySelectorAll('#infoLabel')
radioButtons.forEach((radio, index) => {
  radio.addEventListener('change', () => {
    infoSections.forEach(section => {
      section.style.display = 'none';
    });
    infoSections[index].style.display = 'block';
    labels.forEach(label => {
      label.style.backgroundColor = 'inherit'
      label.style.color = '#575153'
    });
    labels[index].style.background = '#333333'
    labels[index].style.color = 'white'
  });
});

const products = new Cart().cartFromLocalStorage();
let listItems = document.querySelector('.korzinka-hover-ul')
let firstCount = document.querySelector('.count-first')
let totalCount = document.querySelector('.count')
let buyItems = document.querySelector('#buyItems')
let clearCart = document.querySelector('#clear')
let modul = document.querySelector('.modul')
new ProductInIndex().renderProductInHover(products)

firstCount.innerHTML = `${new ProductInIndex().totalCount(products)} items`
totalCount.innerHTML = `Total:£${new ProductInIndex().totalPrice(products)}`;


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
  if (listItems.innerHTML != '') {
      count = 0
      firstCount.innerHTML = `${count} items`
      totalCount.innerHTML = `Total:${count}`
      localStorage.removeItem("Cart")
      window.location.reload()
  }
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