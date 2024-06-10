const mongoose = require("mongoose")

const promise = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    }
});
const Promise = mongoose.model("Promise", promise);


module.exports = Promise