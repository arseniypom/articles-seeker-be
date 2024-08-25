"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.articlesRouter = void 0;
const express_1 = require("express");
const articlesController_1 = require("../controllers/articlesController");
exports.articlesRouter = (0, express_1.Router)();
exports.articlesRouter.get('/articles', articlesController_1.getArticles);
