import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import cors from 'cors';
import 'dotenv/config';

import { findArticlesByTopic } from './gpt';

const app = express();
const port = process.env.PORT;

app.use(helmet());
app.use(cors());
app.use(express.json());

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});
app.use(limiter);

app.get('/articles', async (req, res) => {
  try {
    const { topic, page } = req.query;

    if (typeof topic !== 'string') {
      return res.status(400).json({ error: 'Invalid topic parameter' });
    }
    if (!topic.length) {
      return res.status(200).json({ topic, articles: [], totalPages: 1 });
    }

    const pageNumber = parseInt(page as string, 10) || 1;

    const articles = await findArticlesByTopic(topic, pageNumber);

    res.status(200).json({ topic, articles, totalPages: 10 });
  } catch (error) {
    console.error('Error handling request:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.use((err: any, req: Request, res: Response) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
