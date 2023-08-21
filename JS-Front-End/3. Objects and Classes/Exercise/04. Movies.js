function extractMovies(commands) {

    const SPLIT_BY_ADD_MOVIE = 'addMovie ';
    const SPLIT_BY_DIRECTOR = ' directedBy '; 

    function addMovie(name) {
        return {name};
    }

    function directMovie(movieName, director, movies) {
        searchedMovieIndex = movies.findIndex((obj) => obj.name === movieName);
        if (searchedMovieIndex != -1) {
            movies[searchedMovieIndex].director = director;
        }
    }

    function scheduleMovie(movieName, date, movies) {
        searchedMovieIndex = movies.findIndex((obj) => obj.name === movieName);
        if (searchedMovieIndex != -1) {
            movies[searchedMovieIndex].date = date;
        }
    }

    function isValidMovie(movie) {
        if (!movie["director"])
            return false;
        if (!movie["date"])
            return false;
        else return true;
    }

    function withdrawOperation(text) {
        if (text.includes(SPLIT_BY_ADD_MOVIE))
            return SPLIT_BY_ADD_MOVIE;
        else if (text.includes(SPLIT_BY_DIRECTOR))
            return SPLIT_BY_DIRECTOR;
        return  ' onDate ';
    }

    let movies = [];
    for (let command of commands) {
        let mode;
        function splitText(text) {
            let separator = withdrawOperation(text);
            switch (separator) {
                case SPLIT_BY_ADD_MOVIE:
                    mode = 0;
                    break;
                case SPLIT_BY_DIRECTOR:
                    mode = 1;
                    break;
                default:
                    mode = 2;
            }
            let separatedText = text.split(separator);
            return separatedText;
        }
        let splitCommand = splitText(command);
        
        let movieName;
        let searchedMovieIndex;
        switch (mode) {
            case 0:
                movieName = splitCommand[1];
                movies.push(addMovie(movieName));
                break;
            case 1:
                movieName = splitCommand[0];
                let director = splitCommand[1];
                directMovie(movieName, director, movies);
                break;
            default:
                movieName = splitCommand[0];
                let date = splitCommand[1];
                scheduleMovie(movieName, date, movies);
        }
    }

    let filteredMovies = movies.filter(isValidMovie);
    for (let filteredMovie of filteredMovies)
        console.log(JSON.stringify(filteredMovie));
}

extractMovies([
    'addMovie Fast and Furious',
    'addMovie Godfather',
    'Inception directedBy Christopher Nolan',
    'Godfather directedBy Francis Ford Coppola',
    'Godfather onDate 29.07.2018',
    'Fast and Furious onDate 30.07.2018',
    'Batman onDate 01.08.2018',
    'Fast and Furious directedBy Rob Cohen'
    ]
    );

extractMovies([
    'addMovie The Avengers',
    'addMovie Superman',
    'The Avengers directedBy Anthony Russo',
    'The Avengers onDate 30.07.2010',
    'Captain America onDate 30.07.2010',
    'Captain America directedBy Joe Russo'
    ]);