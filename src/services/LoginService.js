export default class LoginService {
    static myInstance = null;
    static getInstance() {
        if (LoginService.myInstance == null) {
            LoginService.myInstance =
                new LoginService();
        }
        return this.myInstance;
    }

    async currentUser() {
        var user = {}
        let promise =
            fetch("http://localhost:8080/currentUser", {
                method: 'GET',
                credentials: 'include'
            })
            .then(response => response.json())
            .then(currentUser => {user = currentUser})
        await promise
        return user
    }

    async currentUsername() {
        var user = {}
        let promise =
            fetch("http://localhost:8080/currentUsername", {
                method: 'GET',
                credentials: 'include'
            })
            .then(response => response.json())
            .then(currentUser => {user = currentUser})
        await promise
        return user
    }

    async getUser(username) {
        var user = {}
        let promise =
            fetch(`http://localhost:8080/getUser/${username}`, {
                method: 'GET',
                credentials: 'include'
            })
            .then(response => response.json())
            .then(gotUser => {user = gotUser})
        await promise
        return user
    }

    async getUserFriends() {
        var userFriends = []
        let promise =
            fetch('http://localhost:8080/api/accounts/friends', {
                method: 'GET',
                credentials: 'include'
            })
            .then(response => response.json())
            .then(gotUser => {userFriends = gotUser})
        await promise
        return userFriends
    }

    async createAccount(account) {
        var result = true
        let promise = 
            fetch("http://localhost:8080/api/accounts", {
            method: 'POST',
            body: JSON.stringify(account),
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => response.json()).then(response => {
            if (response.id === -1) {
                result = false
            }
        })
        await promise
        return result
    }


    async verifyAccount(account) {
        var result = true
        let promise = 
            fetch("http://localhost:8080/api/accounts/verify", {
            method: 'POST',
            body: JSON.stringify(account),
            headers: {
                'content-type': 'application/json'
            },
            credentials: 'include'
        })
            .then(response => response.json())
            .then(
                response => {
                if (response.id === -1) {
                    result = false
                }
        })
        await promise
        return result
    }

    async logout() {
        let promise = 
            fetch("http://localhost:8080/logout", {
                method: 'POST',
                credentials: 'include'
            })
            .then(response => {
                console.log(response)
            })
    }
}