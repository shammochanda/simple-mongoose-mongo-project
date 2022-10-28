import express from "express";
import BooksCtrl from "./books.controller.js";

const router = express.Router();

router.route("/").get(BooksCtrl.apiGetBooks).post(BooksCtrl.apiPostBook);

export default router;
