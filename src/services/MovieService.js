export default class MovieService {
    static myInstance = null;
    static getInstance() {
        if (MovieService.myInstance == null) {
            MovieService.myInstance =
                new MovieService();
        }
        return this.myInstance;
    }

    async createMovie(imdbid, name, poster) {
        let promise = 
            fetch('http://localhost:8080/api/movie/create', {
            method: 'PUT',
            body: JSON.stringify({
                imdbid,
                name,
                poster
            }),
            headers: {
                'content-type': 'application/json'
            }
        }).then(response => console.log(response))
        await promise
    }
}
