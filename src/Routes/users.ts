import express = require("express");
import mysql = require("mysql");

import { Cookies } from "./verify_cookies";
import { Mysql } from "../Mysql/mysql";

const mysql = new Mysql();

const router = express.Router();

let cookies_data;

router.use(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    cookies_data = new Cookies(req, res).verify();
    next();
});

router.get("/", async (req: express.Request, res: express.Response | any) => {
    res.render("content", { cookies_data });
});

router.post("/", async (req, res) => {
    if (cookies_data.cookies_privilege !== "admin") {
        return res.redirect("/");
    }
    const users = await mysql.find_all();

    res.end(res.render("responsePayload", await { users, cookies_data }));
});

router.post("/modify", async (req: express.Request, res: express.Response) => {
    if (req.body.make_D !== undefined) {
        mysql.delete_one(req.body.user);
    } else {
        mysql.make_admin(req.body.user);
    }
    res.redirect(307, await "/m/");
});

export default router;
