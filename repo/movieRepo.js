const MovieSchema = require('../model/movieSchema.js');


exports.createMovie = async (params) => {
    try {
        const resultData = await MovieSchema.create(params);
        return resultData;

    } catch (err) {
        throw err;
    }
}

exports.getAllMovie = async (pagination) => {
    try {
        const result = await MovieSchema.aggregate(pagination);
        return result;
    } catch (err) {
        throw err;
    }
}

exports.movieUpdate = async (query) => {
    const resultData = await MovieSchema.findOneAndUpdate(query[0], query[1]);
    return resultData;
}

exports.searchByName = async (pipeline) => {
    try {
        const result = await MovieSchema.aggregate(pipeline);
        return result;

    } catch (err) {
        throw err;
    }
}

exports.getMovieById = async (getQuery) => {
    try {
        const resultData = await MovieSchema.aggregate(getQuery);
        return resultData;

    } catch (err) {
        throw err;
    }
}

exports.deleteMovieId = async (delQuery) => {
    try {
        const result = await MovieSchema.findOneAndUpdate(delQuery[0], delQuery[1])
        return result;
    } catch (err) {
        throw err;
    }
}
