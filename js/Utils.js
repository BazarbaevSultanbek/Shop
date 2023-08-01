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

export function addAdmin(username, password) {
    admin.push({
        login: username,
        password: password,
        id: Math.floor(Math.random() * 1000000)
    });

    new Admins().saveAdminsToLocalStorage(admin);
}

export { admin };

