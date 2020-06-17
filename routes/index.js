const bodyParser = require("body-parser");
const { response } = require("express");
const { json } = require("body-parser");
require("dotenv").config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const authNumber = process.env.TWILIO_PHONE_NUMBER;

const client = require("twilio")(accountSid, authToken);




("use strict");

const urlencodedParser = bodyParser.urlencoded({ extended: false });

module.exports = function (app) {

  app.get("/", function (req, res) {
    res.render("pages/index");
  });

  app.post("/sending", urlencodedParser, function (req, res) {

    function Message() {
      const reciver = req.body.to_number;
      const date = req.body.date;
      const message = req.body.message;


      client.messages
        .create({
          body: "Date:" + date + "\nMessage" + message,
          mediaUrl: [
            "https://images.unsplash.com/photo-1590712297943-4ef62762f894?ixlib=rb-1.2.1&auto=format&fit=crop&w=647&q=80",
          ],
          from: "whatsapp:" + authNumber,
          to: "whatsapp:+" + reciver,
        })
        .then((message) => console.log(message.sid))
        .done();
    }

    try {
      Message();
      res.render("pages/index");
    }
    catch (err) {
      console.log(err);
    }

  });

};

