"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getArticles = void 0;
const gpt_1 = require("../gpt");
const getArticles = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { topic, page } = req.query;
        if (typeof topic !== 'string') {
            return res.status(400).json({ error: 'Invalid topic parameter' });
        }
        if (!topic.length) {
            return res.status(200).json({ topic, articles: [], totalPages: 1 });
        }
        const pageNumber = parseInt(page, 10) || 1;
        const articles = yield (0, gpt_1.findArticlesByTopic)(topic, pageNumber);
        res.status(200).json({ topic, articles, totalPages: 10 });
    }
    catch (error) {
        console.error('Error handling request:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.getArticles = getArticles;
