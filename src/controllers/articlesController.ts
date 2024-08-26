import { Request, Response } from 'express';
import { findArticlesByTopic } from '../gpt';
import { IArticlesRequestQuery } from '../types/articles';

export const getArticles = async (req: Request<{}, {}, {}, IArticlesRequestQuery>, res: Response) => {
  try {
    const { topic, page, model } = req.query;

    if (typeof topic !== 'string') {
      return res.status(400).json({ error: 'Invalid topic parameter' });
    }
    if (!topic.length) {
      return res.status(200).json({ topic, articles: [], totalPages: 1 });
    }

    const pageNumber = parseInt(page as string, 10) || 1;

    const articles = await findArticlesByTopic(topic, pageNumber, model);

    res.status(200).json({ topic, articles, totalPages: 10 });
  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
