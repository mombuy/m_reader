import express = require("express");
import multer = require("multer");
import path = require("path");
import Datauri = require("datauri");
import progress = require("progress-stream");

import { Mysql } from "../Mysql/mysql";
import { Cookies } from "./verify_cookies";

const router = express.Router();
const mysql = new Mysql();
const cloudinary = require("cloudinary");
const dUri = new Datauri();

cloudinary.config({
    cloud_name: "picturesapplecustard",
    api_key: "416216855519675",
    api_secret: "TkE7-xyZCqx3HDEbhPI7uK5MzvE",
});

const storage = multer.memoryStorage();

const upload = multer({
    storage: storage,
});

let cookies_data;

router.use(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    cookies_data = new Cookies(req, res).verify();
    if (cookies_data.cookies_privilege !== "admin") {
        return res.redirect("/");
    }
    next();
});

router.post("/", (req: express.Request, res: express.Response, next: express.NextFunction) => {
    res.render("upload", { cookies_data });
});

router.post("/upload", upload.array("image", 100), async (req: any, res: express.Response) => {
    let dataUri;
    const files = req.files;
    for (let i = 0; i < files.length; i++) {
        dataUri = (req) => dUri.format(path.extname(req.files[i].originalname).toString(), req.files[i].buffer);
        const p = progress({
            length: dataUri,
            time: 1000,
        });
        req.pipe(p);
        p.headers = req.headers;
        p.on("progress", (progress) => {
            console.log(Math.round(progress.percentage) + "%");
        });
        await cloudinary.v2.uploader.upload(dataUri(req).content, { public_id: req.body.name + "/" + "view" + "/" + (i + 1) }, (error) => {
            if (error) {
                res.send(error);
            }
        });
    }
    let name = req.body.name,
        preview = "1",
        desc = req.body.desc;
    if (desc.length === 0) {
        desc = "no description";
    }
    mysql.save_manga(name, preview, desc, req.files.length);
    res.redirect(await "/v/");
});

export default router;
