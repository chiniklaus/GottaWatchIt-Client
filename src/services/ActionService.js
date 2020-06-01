export default class ActionService {
    static myInstance = null;
    static getInstance() {
        if (ActionService.myInstance == null) {
            ActionService.myInstance =
                new ActionService();
        }
        return this.myInstance;
    }

    async rateMovie(name, imdbid, uid, rating, username) {
        let promise = 
            fetch(`http://localhost:8080/api/action/rate/${imdbid}/${uid}`, {
            method: 'PUT',
            body: JSON.stringify([rating, name, username]),
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => console.log(response))
        await promise
    }

    async addComment(name, imdbid, uid, comment, username, date) {
        let promise = 
            fetch(`http://localhost:8080/api/action/comment/${imdbid}/${uid}`, {
            method: 'PUT',
            body: JSON.stringify([comment, name, username, date]),
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => console.log(response))
        await promise
    }

    async getComments(imdbid) {
        var comments
        let promise = 
            fetch(`http://localhost:8080/api/action/comments/${imdbid}`, {
            method: 'GET'
        }).then(response => response.json())
        .then(response => {comments = response})
        await promise
        return comments
    }

    async getAverageRating(imdbid) {
        var rating
        let promise = 
            fetch(`http://localhost:8080/api/action/rating/${imdbid}`, {
            method: 'GET'
        }).then(response => response.json())
        .then(response => {rating = response})
        await promise
        return rating
    }
}
