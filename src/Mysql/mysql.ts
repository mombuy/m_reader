import mysql = require("mysql");
import knex = require("knex");
import multer = require("multer");
import path = require("path");

export class Mysql {
    DIR = "./uploads";
    knex = require("knex")({
        client: "mysql",
        connection: {
            host: "bi2jnwdmlse79o7fxemx-mysql.services.clever-cloud.com",
            user: "u3iyfoj9l0m1qcmx",
            password: "VKYmppnmFQrZSLBbDfCk",
            database: "bi2jnwdmlse79o7fxemx",
        },
        useNullAsDefault: true,
    });

    constructor() {}
    save_user(name: string, password: string, email: string) {
        const d = [
            {
                name: name,
                password: password,
                mail: email,
            },
        ];
        this.knex("USER").insert(d).then(console.log("SUCCESS"));
    }
    async find_all() {
        let search_result;
        await this.knex("USER")
            .select("*")
            .then((result) => {
                search_result = result;
            });
        return search_result;
    }
    async find_one(name: string) {
        let search_result;
        await this.knex("USER")
            .select("*")
            .where("NAME", name)
            .orWhere("MAIL", name)
            .then((user) => {
                search_result = user;
            });

        if (search_result.length === 0) {
            return true;
        } else {
            return false;
        }
    }
    async find_user(name: string, password: string) {
        if (name === undefined || password === undefined) {
            return true;
        }
        let search_result;
        await this.knex("USER")
            .where("NAME", name)
            .andWhere("PASSWORD", password)
            .then((user) => {
                search_result = user;
            });

        if (search_result.length === 0) {
            return true;
        } else {
            return false;
        }
    }
    async find_user_val(name: string, password: string) {
        let search_result;
        await this.knex("USER")
            .where("NAME", name)
            .andWhere("PASSWORD", password)
            .then((user) => {
                search_result = user;
            });
        return search_result;
    }
    async is_admin(privilege: string) {
        if (privilege === undefined) {
            return true;
        }
        let search_result;
        await this.knex("USER")
            .where("PRIVILEGE", privilege)
            .then((user) => {
                search_result = user;
            });

        console.log(search_result[0].PRIVILEGE);
        if (search_result[0].PRIVILEGE !== "admin") {
            return true;
        } else {
            return false;
        }
    }
    async delete_one(ID: number) {
        await this.knex("USER").select("*").where("ID", ID).del();
    }
    async make_admin(ID: number) {
        await this.knex("USER").select("*").where("ID", ID).update({ PRIVILEGE: "vip" });
    }
    async save_manga(name: string, preview: string, desc: string, length: number) {
        const M = [
            {
                MANGA_NAME: name,
                PREVIEW_DIR: preview,
            },
        ];
        const D = [
            {
                DESCRIPTION: desc,
                PAGE_QUANTITY: length,
            },
        ];
        this.knex("MANGA").insert(M).then(console.log("added manga"));
        this.knex("MANGA_DETAIL").insert(D).then(console.log("added details"));
    }
    async find_manga_one(name: string) {
        let search_result;
        await this.knex("MANGA")
            .select("*")
            .where("MANGA_NAME", name)
            .then((user) => {
                search_result = user;
            });
        return search_result;
    }
    async join_tables(ID: number) {
        let search_result;
        await this.knex("MANGA")
            .distinct("*")
            .innerJoin("MANGA_DETAIL")
            .where("MANGA_DETAIL.ID", "=", ID)
            .andWhere("MANGA.ID", "=", ID)
            .then((result) => {
                search_result = result;
            });
        return search_result;
    }
    async find_manga_all() {
        let search_result;
        await this.knex("MANGA")
            .select("*")
            .then((result) => {
                search_result = result;
            });
        return search_result;
    }
}
