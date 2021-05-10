const express = require('express');
var cors = require('cors')
const Vonage = require('@vonage/server-sdk')
require('dotenv').config()

const app = express();

app.use(cors())

app.get('/', (req, res) => {
    res.status(200).send("Hello world!")
})


// nexmo sms code when hit get resquest to /notify
const vonage = new Vonage({
    apiKey: process.env.API_KEY,
    apiSecret: process.env.API_SECRETE
});

const from = "Vonage APIs"
const to = "919505629940"
const text = 'Hello World!'

app.get('/notify', (req, res) => {
     vonage.message.sendSms(from, to, text, (err, responseData) => {
        if (err) {
             res.status(417).json([{ status: "error" }])
        } else {
            if(responseData.messages[0]['status'] === "0") {
                 res.status(200).json([{ status: "success" }])
             } else {
                 ///console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
                 res.status(417).json([{ status: "error" }])
             }
         }
     })
})

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})