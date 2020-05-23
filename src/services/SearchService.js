export default class SearchService {
    static myInstance = null;
    static getInstance() {
        if (SearchService.myInstance == null) {
            SearchService.myInstance =
                new SearchService();
        }
        return this.myInstance;
    }

    async searchMovie(keyword) {
        var movies
        let promise = fetch(`https://cors-anywhere.herokuapp.com/http://www.omdbapi.com/?apikey=5d6e84fa&s=${keyword}`)
            .then(response => response.json())
            .then(results => {movies = results})
        await promise
        return movies
    }

    async searchMovieByID(id) {
        var movie
        let promise = fetch(`https://cors-anywhere.herokuapp.com/http://www.omdbapi.com/?apikey=5d6e84fa&i=${id}`)
            .then(response => response.json())
            .then(result => { movie = result })
        await promise
        return movie
    }

    async searchMoviePosterByID(id, name) {
        let url
        let promise = fetch(`https://cors-anywhere.herokuapp.com/http://img.omdbapi.com/?apikey=5d6e84fa&i=${id}`)
            .then(response => response.blob())
            .then(blobResponse => URL.createObjectURL(blobResponse))
            .then(objurl => {url = objurl.toString()})
        await promise
        return [url, id, name]
    }
}
