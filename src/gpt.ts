import OpenAI from 'openai';
import 'dotenv/config';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const findArticlesByTopic = async (topic: string, page: number) => {
  const offset = (page - 1) * 5 + 1;
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini-2024-07-18',
    messages: [
      {
        role: 'system',
        content: `You are an API-service that finds and provides real existing articles in English for a given topic in the format of JSON, as an array of objects with no other comments, symbols, quotes, imitating a response from real API. Each article you send should be an object: {id: <unique id, starting from ${offset}>,title:<article title>,author:<article author>,content:<1 sentence 15 words max summarizing the article>}. The response from you should look like this: [{<article>}, {<article>}, ...]`,
      },
      {
        role: 'user',
        content: `Find 5 articles about ${topic}`,
      },
    ],
  });

  if (response.choices[0].message?.content) {
    const articlesText = response.choices[0].message?.content.trim();
    const articles = JSON.parse(articlesText);

    return articles;
  }
};
