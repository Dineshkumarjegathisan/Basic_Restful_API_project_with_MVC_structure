const MovieService = require('../service/movieService.js');
const errorCode = require('../errorCode.js');
const { v4: uuidv4 } = require('uuid');
const { checkMovieId, checkMovieName, checkPagination } = require('../validation.js');


exports.createMovie = async (req, res) => {
    try {
        req.body.movieId = uuidv4();
        const result = await MovieService.createMovie(req.body);
        res.status(201).json({
            message: errorCode.CREATE_SUCESS
        })
    } catch (err) {

        throw err;
    }
}

exports.getAllMovie = async (req, res) => {
    try {

        let limit = req.query.limit || 10;
        let page = req.query.page || 1;
        const data = await checkPagination(page, limit);
        const result = await MovieService.getAllMovie(data)
        res.status(200).json({
            result
        })

    } catch (err) {
        if (err.message == errorCode.INVALID_INPUT_FORMAT_ERROR.message) {
            res
                .status(errorCode.INVALID_INPUT_FORMAT_ERROR.status)
                .send(errorCode.INVALID_INPUT_FORMAT_ERROR)
        }
        else {
            res
                .status(errorCode.INTERNAL_SERVER_ERROR.status)
                .send(errorCode.INTERNAL_SERVER_ERROR)
        }
    }
}

exports.movieUpdate = async (req, res) => {
    try {
        await checkMovieId(req.params.id)
        const result = await MovieService.movieUpdate(req.params.id, req.body.isRunning);
        res.status(200).json(
            result
        )
    } catch (err) {
        if (err.message === errorCode.USER_ID_NOT_FOUND_ERROR.message) {
            res
                .status(errorCode.USER_ID_NOT_FOUND_ERROR.status)
                .send(errorCode.USER_ID_NOT_FOUND_ERROR)
        }
        else {
            res
                .status(errorCode.INTERNAL_SERVER_ERROR.status)
                .send(errorCode.INTERNAL_SERVER_ERROR)
        }
    }
}

exports.searchByName = async (req, res) => {
    try {
        await checkMovieName(req.query.search);
        const result = await MovieService.searchByName(req.query.search);
        res.status(200).json({
            result
        })
    } catch (err) {
        //throw error if name is not found
        if (err.message === errorCode.FIELD_NOT_PRESENT_ERROR.message) {
            res
                .status(errorCode.FIELD_NOT_PRESENT_ERROR.status)
                .send(errorCode.FIELD_NOT_PRESENT_ERROR);
        }
        else {
            res.status(errorCode.INTERNAL_SERVER_ERROR.status)
                .send(errorCode.INTERNAL_SERVER_ERROR);
        }
    }
}
exports.getMovieById = async (req, res) => {
    try {
        await checkMovieId(req.params.id)
        const result = await MovieService.getMovieById(req.params.id);
        res.status(200).json({
            result
        })
    } catch (err) {
        //throw error if movie is id not found     
        if (err.message === errorCode.USER_ID_NOT_FOUND_ERROR.message) {
            res
                .status(errorCode.USER_ID_NOT_FOUND_ERROR.status)
                .send(errorCode.USER_ID_NOT_FOUND_ERROR);
        }
        else
            res
                .status(errorCode.INTERNAL_SERVER_ERROR.status)
                .send(errorCode.INTERNAL_SERVER_ERROR);

    }
}
exports.deleteMoiveId = async (req, res) => {
    try {

        await checkMovieId(req.params.id);
        const result = await MovieService.deleteMovieId(req.params.id)
        res.status(200).json({
            result: errorCode.DELETE_SUCESS
        })
    } catch (err) {
        //throw error if movie is id not found     
        if (err.message === errorCode.USER_ID_NOT_FOUND_ERROR.message) {
            res
                .status(errorCode.USER_ID_NOT_FOUND_ERROR.status)
                .send(errorCode.USER_ID_NOT_FOUND_ERROR);
        }
        else {
            res
                .status(errorCode.INTERNAL_SERVER_ERROR.status)
                .send(errorCode.INTERNAL_SERVER_ERROR);
        }
    }
}


