const functions = require('firebase-functions');
const got = require("got");

exports.test = functions.https.onCall(async () => {
    const response = await got("https://sindresorhus.com");
    return response.body;
})
