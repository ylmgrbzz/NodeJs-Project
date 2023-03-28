import express from "express";
import auth from "./routes/auth.js";
import dotenv from "dotenv";
import session from "express-session";
import fileUpload from "express-fileupload"
import db from "./db.js";
import "./utils/env.js"
import { decrypt } from "./utils/crypto.js";
import winston from "winston";

const envFile = process.env.NODE_ENV ? `.env.${process.env.NODE_ENV}` : ".env";
dotenv.config({
    path: envFile,
});


const app = express();
const port = 3000;

app.set("view engine", "ejs");
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(
    fileUpload({
        // safeFileNames: true,
        //preserveExtension: true,
        useTempFiles: true
    })
)
app.use('/assets', express.static('assets'))
app.use('/upload', express.static('upload'))

app.use((req, res, next) => {
    res.locals.session = req.session
    res.locals.decrypt = decrypt
    next()
})

app.get("/", (req, res) => {
    res.render("index", {
        title: "Yalım Gürbüz",
        greeting: "Hello World!",
    });
});
app.use(
    session({
        secret: process.env.SESSION_KEY,
        resave: false,
        saveUninitialized: true,
    })
);
app.use("/auth", auth);

app.use((err, req, res, next) => {

    logger.error(`${req.method} ${req.url} - ${err.message}`, {
        timestamp: new Date(),
        stack: err.stack,
    });

    res.status(500).send('Bir hata meydana geldi!')

    //next()
})


app.listen(port, () => {
    console.log(`Project app listening at http://localhost:${port}`);
});
