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



export class Product {
    saveProductToLocalStorage(product) {
        localStorage.setItem('products', JSON.stringify(product));
    }

    productsFromLocalStorage() {
        let products = JSON.parse(localStorage.getItem('products') || '[]');
        return products;
    }
    addProduct(pro){
        products = JSON.parse(localStorage.getItem('products') || '[]')
        products.push(pro)
        localStorage.setItem("products", JSON.stringify(products))
    }
}

let products = new Product().productsFromLocalStorage();

if (products.length === 0) {
    products = [
        {
            image:'shirt2.png',
            type: 'T-shirt',
            price: '$368',
            discount: '-$2%',
            desc: "Lorem ipsum",
            id: 745972
        }
    ];
    new Product().saveProductToLocalStorage(products);
}

export { products };



export class Order {
    saveOrderToLocalStorage(order) {
        localStorage.setItem('orders', JSON.stringify(order));
    }

    ordersFromLocalStorage() {
        let orders = JSON.parse(localStorage.getItem('orders') || '[]');
        return orders;
    }
}

let orders = new Order().ordersFromLocalStorage();

if (orders.length === 0) {
    orders = [
        {
            name:'John Cena',
            number:'+1 25678945',
            orderNumber:5,
            id: 745972
        }
    ];
    new Order().saveOrderToLocalStorage(orders);
}

export { orders };
