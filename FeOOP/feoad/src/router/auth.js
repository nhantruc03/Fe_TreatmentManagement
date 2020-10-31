class Auth {
    constructor() {
        this.authenticated = false
        this.authenticatedAdmin = false
    }

    loginAdmin(role) {
        if (role === "admin") {
            this.authenticatedAdmin = true
        }
    }

    logoutAdmin(cb) {
        this.authenticatedAdmin = false

    }

    isAuthenticatedAdmin() {
        return this.authenticatedAdmin;
    }
}

export default new Auth()