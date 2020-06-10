export default class RecommendationService {
    static myInstance = null;
    static getInstance() {
        if (RecommendationService.myInstance == null) {
            RecommendationService.myInstance =
                new RecommendationService();
        }
        return this.myInstance;
    }

    async recordRecommendation(from, to, imdbid, title, content) {
        let promise =
            fetch(`http://localhost:8080/api/recommendation/${from}/${to}`, {
                method: 'PUT',
                body: JSON.stringify([title, content, imdbid]),
                headers: {
                    'content-type': 'application/json'
                }
            })
            .then(response => {console.log(response)})
        await promise
    }

    async getRecommendationToMe(username) {
        var ls
        let promise =
            fetch(`http://localhost:8080/api/recommendation/get/${username}`, {
                method: 'GET',
            })
            .then(response => response.json())
            .then(response => {ls = response})
        await promise
        return ls
    }

    async getRecommendationISent(username) {
        var ls
        let promise =
            fetch(`http://localhost:8080/api/recommendation/send/${username}`, {
                method: 'GET',
            })
            .then(response => response.json())
            .then(response => {ls = response})
        await promise
        return ls
    }

    async deleteRecommendationByFrom(id) {
        let promise =
            fetch(`http://localhost:8080/api/recommendation/delete/from/${id}`, {
                method: 'DELETE'
            })
            .then(response => {console.log(response)})
        await promise
    }

    async deleteRecommendationByTo(id) {
        let promise =
            fetch(`http://localhost:8080/api/recommendation/delete/to/${id}`, {
                method: 'DELETE'
            })
            .then(response => {console.log(response)})
        await promise
    }
}