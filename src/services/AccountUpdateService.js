export default class AccountUpdateService {
    static myInstance = null;
    static getInstance() {
        if (AccountUpdateService.myInstance == null) {
            AccountUpdateService.myInstance =
                new AccountUpdateService();
        }
        return this.myInstance;
    }

    async likeMovie(imdbid, title, uid, username) {
        let promise = 
            fetch(`http://localhost:8080/api/likeAction/${imdbid}/${uid}`, {
            method: 'PUT',
            body: JSON.stringify([username, title]),
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => console.log(response))
        await promise
    }

    async selectFavoriteMovie(imdbid, title, uid, username) {
        let promise = 
            fetch(`http://localhost:8080/api/favAction/${imdbid}/${uid}`, {
            method: 'PUT',
            body: JSON.stringify([username, title]),
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => console.log(response))
        await promise
    }

    async getLikesByUser(uid) {
        var likes
        let promise = 
            fetch(`http://localhost:8080/api/likeAction/user/${uid}`, {
            method: 'GET',
        }).then(response => response.json())
        .then(response => {likes = response})
        await promise
        return likes
    }

    async deleteLikeAction(username, imdbid) {
        await fetch(`http://localhost:8080/api/likeAction/delete/${username}/${imdbid}`, {
            method: 'DELETE',
        }).then(response => console.log(response))
    }

    async updateUsername(username, oldUsername) {
        let promise = 
            fetch('http://localhost:8080/api/accounts/update/username', {
            method: 'PUT',
            body: JSON.stringify([username, oldUsername]),
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => console.log(response))
        await promise
    }

    async updatePassword(password, oldUsername) {
        let promise = 
            fetch('http://localhost:8080/api/accounts/update/password', {
            method: 'PUT',
            body: JSON.stringify([password, oldUsername]),
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => console.log(response))
        await promise
    }

    async acceptFriend(username, musername) {
        let promise = 
            fetch(`http://localhost:8080/api/friendship/valid/${username}/${musername}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => console.log(response))
        await promise
    }

    async cancelRequest(username, musername) {
        let promise = 
            fetch(`http://localhost:8080/api/friendship/delete/${musername}/${username}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => console.log(response))
        await promise
    }
}
