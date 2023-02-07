const errorCode = require("./errorCode.js");
const MovieSchema = require("./model/movieSchema");
const _ = require("lodash");


//check if Id present in db or not
exports.checkMovieId = async (id) => {
    let refId = await MovieSchema.find({ movieId: id, isDeleted: false });
    if (refId.length == 0) {
        throw new Error(errorCode.USER_ID_NOT_FOUND_ERROR.message)
    }
    // return ;
}

//check if moive name prsent in db or not
exports.checkMovieName = async (name) => {

    let moviename = await MovieSchema.find({ name: name, isDeleted: false });
    if (moviename.length == 0) {
        throw new Error(errorCode.FIELD_NOT_PRESENT_ERROR.message)
    }
}

//check if page and limit is a interger
exports.checkPagination = async (page, limit) => {
    if (typeof page == "string" && typeof limit == "string") {
        page = parseInt(page)
        limit = parseInt(limit)

        if (isNaN(page) || isNaN(limit)) {
            throw new Error(errorCode.INVALID_INPUT_FORMAT_ERROR.message);
        }
        else {
            return { page: page, limit: limit }
        }
    }
    else {
        return { page: page, limit: limit }
    }
}

//check if update is string or not
exports.checkUpdate = async (update) => {
    if (_.isString(update) && update != "") {

        return { update }
    }
    else {
        throw new Error(errorCode.INVALID_INPUT_FORMAT_ERROR.message);
    }

}

