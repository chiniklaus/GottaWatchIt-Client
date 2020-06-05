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
}