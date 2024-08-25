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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findArticlesByTopic = void 0;
const openai_1 = __importDefault(require("openai"));
require("dotenv/config");
const openai = new openai_1.default({ apiKey: process.env.OPENAI_API_KEY });
const findArticlesByTopic = (topic, page) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const offset = (page - 1) * 5 + 1;
    const response = yield openai.chat.completions.create({
        model: 'gpt-4o-mini-2024-07-18',
        messages: [
            {
                role: 'system',
                content: `You are an API-service that finds and provides articles in English for a given topic in the format of JSON, as an array of objects with no other comments, symbols, quotes, imitating a response from real API. Each article you send should be an object: {id: <unique id, starting from ${offset}>,title:<article title>,author:<article author>,content:<1 sentence 15 words max summarizing the article>}. The response from you should look like this: [{<article>}, {<article>}, ...]`,
            },
            {
                role: 'user',
                content: `Find 5 articles about ${topic}`,
            },
        ],
    });
    if ((_a = response.choices[0].message) === null || _a === void 0 ? void 0 : _a.content) {
        const articlesText = (_b = response.choices[0].message) === null || _b === void 0 ? void 0 : _b.content.trim();
        const articles = JSON.parse(articlesText);
        return articles;
    }
});
exports.findArticlesByTopic = findArticlesByTopic;
