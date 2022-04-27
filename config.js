require('dotenv').config()

let config = {
    dbUrl: `mongodb+srv://${process.env.USER_ID}:${process.env.USER_KEY}@cluster0.botwe.mongodb.net/quotesDatabase?retryWrites=true&w=majority`
};
module.exports = config;