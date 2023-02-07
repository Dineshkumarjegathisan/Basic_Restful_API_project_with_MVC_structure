const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    movieId: {
        type: String,
        require: true
    },
    url: {
        type: String,
        require: true,
        match: [/^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/,
            "Please use a valid URL with HTTP or HTTPS",
        ],
    },
    name: String,
    type: String,
    language: String,
    genres: [String],
    status: String,
    runtime: Number,
    premiered: Date,
    officialSite: String,
    schedule: {
        time: String,
        days: [String],
    },
    rating: {
        average: Number,
    },
    weight: Number,
    network: {
        id: Number,
        name: String,
        country: {
            name: String,
            code: String,
            timezone: String,
        },
    },
    webChannel: String,
    externals: {
        tvrage: Number,
        thetvdb: Number,
        imdb: String,
    },
    image: {
        medium: String,
        original: String,
    },
    summary: String,
    updated: Date,
    _links: {
        self: {
            href: String,
        },
        previousepisode: {
            href: String,
        },
    },
    isDeleted: Boolean,
    isRunning: String
});

module.exports = mongoose.model('movieShow', movieSchema);
