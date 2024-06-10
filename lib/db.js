async function connect() {
    try {
        const mongoose = require("mongoose");
        return await mongoose.connect(process.env.MONGODB)
    } catch (error) {
        console.log(error);
        return error
    }

}


module.exports = connect
