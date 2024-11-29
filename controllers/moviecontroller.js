const { v4:uuidv4} = require('uuid');
const { readMovies, saveMovies } = require('../models/movieModels');

// Create a new moviedata
exports.createMovie = (req, res) => {
    const { title, director, genre, releaseYear, rating, posterURL, description } = req.body;
    // Validate that the title and director are required fields.
    if (!title || !director) {
        return res.status(400).json({ error: 'Title and Director are required' });
    }

    // Ensure that the title is unique (no two movies can have the same title).
    const movies = readMovies();
    if (movies.some(movie => movie.title === title)) {
        return res.status(400).json({ error: 'Movie with this title already exists' });
    }


    const newmovie = {
        id: uuidv4(),
        title,
        director,
        genre: genre || 'Unkown',
        releaseYear: releaseYear || 'Unknown',
        rating: rating ? Math.max(1, Math.min(10, rating)) : null,
        posterURL: posterURL || "default_poster.jpg",// If no poster URL is provided, a default image URL should be used.
        description: description || " "
    }

    movies.push(newmovie);
    saveMovies(movies);
    return res.status(201).json(newmovie);
}

exports.getMovies = (req, res) => {
    
    const movies = readMovies();
    res.json(movies);
}

exports.getMovieByID = (req, res) => {
    const movies = readMovies();
    const movie = movies.find(m => m.id === req.params.id)
    if (!movie) {
        return res.status(201).json({ error: 'Movie not found' });

    }
    res.json(movie);
}

exports.updateMovie = (req, res) => {
    const movies = readMovies();
    const movieIndex = movies.find(m => m.id === req.params.id);

    if (movieIndex === -1) {
        return res.status(404).json({ error: 'Movie not found' });
    }

    const exists = movies[movieIndex];

    if (req.body.title && movies.some(m => m.title === req.body.title && m.id !== req.params.id)) {
        return res.status(400).json({ error: 'Movie with this title already exists' });
    }

    const updated = {
        ...exists,
        title: req.body.title || exists.title,
        director: req.body.director || exists.director,
        genre: req.body.genre || exists.genre,
        releaseYear: req.body.releaseYear || exists.releaseYear,
        rating: req.body.rating ? Math.max(1, Math.min(10, req.body.rating)) : existingMovie.rating,
        posterURL: req.body.posterURL || exists.posterURL,
        description: req.body.description || exists.description,
    };
    movies[movieIndex] = updated;
    saveMovies(movies);
    res.json(updated)
}

exports.deleteByID = (req,res) =>{
    const movies = readMovies();
    const idx = movies.findIndex(m => m.id === req.params.id);
    if(idx === -1){
        return res.status(404).json({ error: 'Movie not found' });
    }
    movies.splice(idx,1);
    saveMovies(movies);
    res.status(204).send();
}
