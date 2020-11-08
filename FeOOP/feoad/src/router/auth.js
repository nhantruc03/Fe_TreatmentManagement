class Auth {
    constructor() {
        this.authenticated = false
        this.authenticatedAdmin = false
    }

    loginAdmin(data) {
        if (data.role === "admin") {
            localStorage.setItem('login', JSON.stringify(data));
            this.authenticatedAdmin = true
        }
    }

    logoutAdmin(cb) {
        localStorage.removeItem('login')
        this.authenticatedAdmin = false

    }

    isAuthenticatedAdmin() {
        try {
            var test = localStorage.getItem('login');
            var obj = JSON.parse(test);
            this.loginAdmin(obj);
            return this.authenticatedAdmin;
        } catch (e) {
            console.log(e);
            this.authenticatedAdmin = false
            return this.authenticatedAdmin;
        }
    }
}

export default new Auth()