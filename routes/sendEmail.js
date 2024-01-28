const SendEmailService = require('../Services/sendEmail');

const express = require('express').Router;

const router = express();

router.post("/sendEmail", async (req, res) => {
    try 
    {
        const response = await new SendEmailService().sendEmail(req);
        return res.status(200).send(response);
    } 
    catch (err) 
    {
        console.log(err.message);
        return res.status(500).send(err.message);
    }
});

module.exports = {emailRouter: router}