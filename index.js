//------Importing all the dependacies and modules required for project-----//

const express = require('express');
const routes = require('./src/routes/router')
const mongoose = require('mongoose');
const app = express()
require('dotenv').config({ path: './.env' })

//----using global middlewares----//

app.use(express.json())
app.use('/', routes)

//----connecting mongodb database to nodejs------//

mongoose.connect(process.env.MongoURL)
    .then(() => { console.log('MongoDB is connected'); })
    .catch((error) => { console.log(error) })

//------creating server port connection-------//

app.listen(process.env.PORT, () => {
    console.log('server is running on port ' + process.env.PORT);
})

