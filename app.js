const express = require('express');
const webpush = require('web-push');
const bodyParser = require('body-parser');
const path = require('path');
const dotenv=require('dotenv')
dotenv.config({ path: './config.env' });

// Create express app.
const app = express();

// Use body parser which we will use to parse request body that sending from client.
app.use(bodyParser.json());

// We will store our client files in ./client directory.
app.use(express.static(path.join(__dirname, "client")))

const publicVapidKey = "BNCBcmiO3wSjE8Hiqb4Dru4ZCRaixRYRoxghw1nXwVGqdr34bMcjnrbhnAep9ga-bqQFM2KeG8HQM12Jqx9nQnU"

const privateVapidKey = "C3SbLGPNHCH8iVEQ5kPCXTiuOJD4GOaAdIpSXmDp72A";

// Setup the public and private VAPID keys to web-push library.
webpush.setVapidDetails("mailto:shivhareadarsh3@gmail.com", publicVapidKey, privateVapidKey);

// Create route for allow client to subscribe to push notification.
app.post('/subscribe', (req, res) => {
    const subscription = req.body;
    res.status(201).json({});
    const payload = JSON.stringify({ title: "Hello World", body: "This is your first push notification" });

    webpush.sendNotification(subscription, payload).catch(console.log);
})

const PORT  = process.env.PORT || 8000;;

app.listen(PORT, () => {
    console.log("Server started on port " + PORT);
});