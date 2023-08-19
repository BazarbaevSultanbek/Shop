const imgSrc = localStorage.getItem('selectedImgSrc'); 
const productDiv = document.querySelector('#product');

if (imgSrc && imgSrc.length !== 0) {
  productDiv.innerHTML = `<img src="${imgSrc}" alt="cloth">`;
}
