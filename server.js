require('dotenv').config();
const express = require("express");
const path = require("path");
const cors = require('cors');
const bodyParser = require("body-parser");
const { emailRouter } = require('./routes/sendEmail');

const app = express();
const PORT = process.env.PORT || 3000;

const assetsPath = path.resolve(__dirname, "../assets");
const imagesPath = path.resolve(__dirname, "../images");
const videosPath = path.resolve(__dirname, "../videos");
const frontendPath = path.resolve(__dirname, "../Portfolio-Frontend");

app.use(cors());
app.use(express.static(assetsPath));
app.use(express.static(imagesPath));
app.use(express.static(videosPath));
app.use(express.static(frontendPath));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/email', emailRouter);


app.get("/", (req, res) => {
    try
    {
        const indexPath = path.resolve(__dirname, "../");
        res.sendFile(indexPath);
    }
    catch(err)
    {
        console.error('Cannot Load Home Page...', err);
    }
});


app.listen(PORT, () => console.log(`Server is open on PORT ${PORT}`));