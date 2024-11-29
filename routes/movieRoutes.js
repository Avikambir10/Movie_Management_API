const express = require('express');
const router = express.Router();

const controller = require('../controllers/moviecontroller');
const {validateMovie }= require('../MIddleware/moviemiddleware');
// const {authmiddle} = require('../MIddleware/authMiddleware')

router.post('/movies', validateMovie, controller.createMovie);
router.get('/movies', controller.getMovies);
router.get('/movies/:id', controller.getMovieByID);
router.put('/movies/:id', validateMovie,controller.updateMovie);
router.delete('/movies/:id', controller.deleteByID);

module.exports = router;  