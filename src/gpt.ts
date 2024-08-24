import OpenAI from 'openai';
import 'dotenv/config';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const findArticlesByTopic = async (topic: string) => {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini-2024-07-18',
    messages: [
      {
        role: 'system',
        content:
          'You are an API that provides articles for a given topic in the format of array of objects with no other comments, symbols, quotes, imitating a response from real API',
      },
      {
        role: 'user',
        content: `Find 3 articles in English about "${topic}". Format articles like so: array of objects (no other comments), each with unique id, title, author and content with 2 sentences summarizing the article`,
      },
    ],
  });

  if (response.choices[0].message?.content) {
    const articlesText = response.choices[0].message?.content.trim();
    const articles = JSON.parse(articlesText);

    return articles;
  }
};
