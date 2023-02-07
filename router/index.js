const express = require('express');
const router = express.Router();
const MovieController = require('../controllers/movieController.js');



//POST
router.route('/createMovie')
    .post(MovieController.createMovie);

//GET
router.route('/getAllMovie')
    .get(MovieController.getAllMovie);

//PATCH (update)
router.route('/movieUpdate/:id')
    .patch(MovieController.movieUpdate);

//PATCH(softDelete)
router.route('/deleteMoiveId/:id')
    .patch(MovieController.deleteMoiveId);

//GET
router.route('/searchByName')
    .get(MovieController.searchByName);

//GET
router.route('/getMovieById/:id')
    .get(MovieController.getMovieById);


module.exports = router;