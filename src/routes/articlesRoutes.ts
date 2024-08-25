import { Router } from 'express';
import { getArticles } from '../controllers/articlesController';

export const articlesRouter = Router();

articlesRouter.get('/articles', getArticles);
