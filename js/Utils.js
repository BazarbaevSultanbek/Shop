export class Admins {
    saveAdminsToLocalStorage(admins) {
        localStorage.setItem('admins', JSON.stringify(admins));
    }

    adminsFromLocalStorage() {
        let admins = JSON.parse(localStorage.getItem('admins') || '[]');
        return admins;
    }
}

let admin = new Admins().adminsFromLocalStorage();

if (admin.length === 0) {
    admin = [
        {
            login: 'admin',
            password: 'admin',
            id: 745972
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


export class Product {
    saveProductToLocalStorage(product) {
        localStorage.setItem('products', JSON.stringify(product));
    }

    productsFromLocalStorage() {
        let products = JSON.parse(localStorage.getItem('products') || '[]');
        return products;
    }
    addProduct(pro) {
        products = JSON.parse(localStorage.getItem('products') || '[]')
        products.push(pro)
        localStorage.setItem("products", JSON.stringify(products))
    }
}

let products = new Product().productsFromLocalStorage();


export class Order {
    saveOrderToLocalStorage(order) {
        localStorage.setItem('orders', JSON.stringify(order));
    }

    ordersFromLocalStorage() {
        let orders = JSON.parse(localStorage.getItem('orders') || '[]');
        return orders;
    }
    addProduct(order) {
        orders = JSON.parse(localStorage.getItem('orders') || '[]')
        orders.push(order)
        localStorage.setItem("orders", JSON.stringify(orders))
    }
}

let orders = new Order().ordersFromLocalStorage();

if (orders.length === 0) {
    orders = [
        {
            name: 'John Cena',
            number: '+1 25678945',
            orderNumber:15,
            id: 745972
        }
    ];
    new Order().saveOrderToLocalStorage(orders);
}

export { orders };
