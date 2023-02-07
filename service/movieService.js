const errorCode = require('../errorCode.js');
const MovieRepo = require('../repo/movieRepo.js');
const _ = require("lodash");
const { checkUpdate } = require('../validation.js');
exports.createMovie = async (params) => {
    try {
        const result = await MovieRepo.createMovie(params)
        return errorCode.CREATE_SUCESS;

    } catch (err) {
        throw err;
    }
}

exports.getAllMovie = async (data) => {
    try {

        const { page, limit } = data;
        const pagination = [{ $match: { isDeleted: false } }, { $skip: (page * 1 - 1) * (limit * 1) }, { $limit: limit * 1 }]
        const result = await MovieRepo.getAllMovie(pagination)
        return result;
    } catch (err) {
        throw err;
    }
}

exports.movieUpdate = async (id, update) => {
    try {

        await checkUpdate(update);
        const query = [{ movieId: id }, { isRunning: update }]
        const result = await MovieRepo.movieUpdate(query);
        return errorCode.UPDATE_SUCESS;

    } catch (err) {
        if (err.message == errorCode.INVALID_INPUT_FORMAT_ERROR.message) {
            return errorCode.INVALID_INPUT_FORMAT_ERROR;
        }
    }
}


exports.searchByName = async (name1) => {
    try {
        const moviename = new RegExp(`^${name1}`, "i")
        const pipeline = [
            {
                $match:
                {
                    name: moviename
                }
            }
        ]
        const result = await MovieRepo.searchByName(pipeline);
        return result;
    } catch (err) {
        console.log(err);
        throw err;
    }
}

exports.getMovieById = async (params) => {
    try {
        const getQuery = [{ $match: { movieId: params, isDeleted: false } }]
        const result = await MovieRepo.getMovieById(getQuery);
        return result;

    } catch (err) {
        throw err
    }
}

exports.deleteMovieId = async (movieid) => {
    try {
        const delQuery = [{ movieId: movieid }, { isDeleted: true }];
        const result = await MovieRepo.deleteMovieId(delQuery);
        return result;
    } catch (err) {
        throw err;
    }
}

