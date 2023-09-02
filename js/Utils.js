export class Admins {
    saveAdminsToLocalStorage(admins) {
        localStorage.setItem('admins', JSON.stringify(admins));
    }

    adminsFromLocalStorage() {
        let admins = JSON.parse(localStorage.getItem('admins') || '[]');
        return admins;
    }
    addAdmin(admin) {
        let newAdmin = JSON.parse(localStorage.getItem('admins') || '[]')
        newAdmin.push(admin)
        localStorage.setItem("admins", JSON.stringify(newAdmin))
    }
}
let admin = new Admins().adminsFromLocalStorage();
if (admin.length === 0) {
    admin = [
        {
            login: 'admin',
            password: 'admin',
            isAdmin:true,
            id: 745972
        },
        {
            login: 'bbbb',
            password: 'bbbb',
            isAdmin:false,
            id: 263704
        },
        {
            login: 'cccc',
            password: 'cccc',
            isAdmin:false,
            id: 931290
        }
    ];
    new Admins().saveAdminsToLocalStorage(admin);
}
export { admin };





export class CurrentUser {
    saveCurrentUser(currentUser) {
        localStorage.setItem("currentUser", JSON.stringify(currentUser));
    }
    getCurrentUser() {
        let currentUser = JSON.parse(localStorage.getItem("currentUser") || "[]");
        return currentUser;
    }
}
let currentUsers = new CurrentUser().getCurrentUser();




export class Cart {
    saveCartToLocalStorage(cart) {
        localStorage.setItem('Cart', JSON.stringify(cart));
    }

    cartFromLocalStorage() {
        let cart = JSON.parse(localStorage.getItem('Cart') || '[]');
        return cart;
    }
    addCart(pro) {
        let cartPlus = JSON.parse(localStorage.getItem('Cart') || '[]')
        cartPlus.push(pro)
        localStorage.setItem("Cart", JSON.stringify(cartPlus))
    }
}



export class Order {
    saveOrderToLocalStorage(order) {
        localStorage.setItem('orders', JSON.stringify(order));
    }

    ordersFromLocalStorage() {
        let orders = JSON.parse(localStorage.getItem('orders') || '[]');
        return orders;
    }
    addOrder(order) {
        orders = JSON.parse(localStorage.getItem('orders') || '[]')
        orders.push(order)
        localStorage.setItem("orders", JSON.stringify(orders))
    }
}

let orders = new Order().ordersFromLocalStorage();
if (orders.length === 0) {
    orders = [
        {
            name: 'sultanbek bazarbayev',
            number: '+998907001677',
            id: 745972,
            orderNumber: [
                {
                    img: "../img/shirt4.png",
                    name: "ave classic",
                    price: "£125",
                    count: "6",
                    discount: "-£20",
                    id: 352442
                },
                {
                    img: "../img/shirt2.png",
                    name: "ave classic sweatshirt",
                    price: "£125",
                    count: "9",
                    discount: "-£20",
                    id: 352442
                }
            ]
        }
    ];
    new Order().saveOrderToLocalStorage(orders);
}
export { orders };
new Order().saveOrderToLocalStorage(orders);





export class ProductList {
    saveProductListToLocalStorage(product) {
        localStorage.setItem('ProductList', JSON.stringify(product));
    }

    productListFromLocalStorage() {
        let products = JSON.parse(localStorage.getItem('ProductList') || '[]');
        return products;
    }
    addProduct(pro) {
        let product = JSON.parse(localStorage.getItem('ProductList') || '[]')
        product.push(pro)
        localStorage.setItem("ProductList", JSON.stringify(product))
    }
}
let productsLocal = new ProductList().productListFromLocalStorage()
if(productsLocal.length == 0){
    productsLocal = [
        {
            img: "../img/shirt1.png",
            type: "ave classic sweatshirt",
            price: 107,
            id: 499570,
            discount: 10,
        },
        {
            img: "../img/shirt3.png",
            type: "ave classic sweatshirt",
            price: 115,
            id: 499572,
            discount: 10,
        },
        {
            img: "../img/shirt4.png",
            type: "ave classic sweatshirt",
            price: 125,
            id: 499573,
            discount: 10,
        },
        {
            img: "../img/shirt5.png",
            type: "ave classic sweatshirt",
            price: 107,
            id: 499574,
            discount: 10,
        },
        {
            img: "../img/shirt6.png",
            type: "ave classic sweatshirt",
            price: 107,
            id: 499575,
            discount: 10,
        },
        {
            img: "../img/shirt2.png",
            type: "ave classic sweatshirt",
            price: 1123,
            id: 499576,
            discount: 20,
        }
    ];
}
new ProductList().saveProductListToLocalStorage(productsLocal)

