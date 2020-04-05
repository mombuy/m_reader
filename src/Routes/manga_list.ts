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

router.get("/:id", async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const manga = await mysql.join_tables(Number(req.params.id));
    res.render("manga", { manga, cookies_data });
});

router.get("/", async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const list = await mysql.find_manga_all();
    res.render("list", { cookies_data, list });
});
export default router;
