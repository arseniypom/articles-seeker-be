import OpenAI from 'openai';
import axios from 'axios';
import * as https from 'https';
import 'dotenv/config';
import { AiModels } from './types/aiModels';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const findArticlesByTopic = async (topic: string, page: number, model?: AiModels) => {
  const offset = (page - 1) * 5 + 1;
  const prompt = `You are an API-service that finds and provides scientific articles in English for a given topic in the format of JSON, as an array of objects with no other comments, symbols, quotes, imitating a response from real API. Each article you send should be an object: {id: <unique id, starting from ${offset}>,title:<article title>,author:<article author>,content:<1 sentence 15 words max summarizing the article>}. The response from you should look like this: [{<article>}, {<article>}, ...]`;

  switch (model) {
    case 'GigaChat':
      return await findArticlesWithGigaChat(topic, prompt);
    case 'ChatGPT':
      return await findArticlesWithChatGPT(topic, prompt);

    default:
      return await findArticlesWithChatGPT(topic, prompt);
  }
};

const findArticlesWithChatGPT = async (topic: string, systemPrompt: string) => {
  const response = await openai.chat.completions.create({
    model: 'gpt-4o-mini-2024-07-18',
    messages: [
      {
        role: 'system',
        content: systemPrompt,
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

const findArticlesWithGigaChat = async (topic: string, systemPrompt: string) => {
  const authUrl = 'https://ngw.devices.sberbank.ru:9443/api/v2/oauth';
  const completionsUrl = 'https://gigachat.devices.sberbank.ru/api/v1/chat/completions';

  const authHeaders = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json',
    RqUID: process.env.GIGACHAT_CLIENT_SECRET,
    Authorization: `Basic ${process.env.GIGACHAT_AUTH_DATA}`,
  };

  const httpsAgent = new https.Agent({ rejectUnauthorized: false });

  const authToken = await axios
    .post(authUrl, { scope: 'GIGACHAT_API_PERS' }, { headers: authHeaders, httpsAgent })
    .then((response) => {
      if (response.data.access_token) {
        return response.data.access_token;
      }
    })
    .catch((error) => {
      console.error(error);
    });

  const reqHeaders = {
    'Content-Type': 'application/x-www-form-urlencoded',
    Accept: 'application/json',
    Authorization: `Bearer ${authToken}`,
  };

  const payload = JSON.stringify({
    model: 'GigaChat',
    messages: [
      {
        role: 'system',
        content: systemPrompt,
      },
      {
        role: 'user',
        content: `Find 2 articles about ${topic}`,
      },
    ],
  });

  const response = await axios
    .post(completionsUrl, payload, { headers: reqHeaders, httpsAgent })
    .then((response) => response.data)
    .catch((error) => {
      console.error(error.message);
    });

  if (response.choices[0].message?.content) {
    const articlesText = response.choices[0].message?.content.trim();
    const articles = JSON.parse(articlesText);

    return articles;
  }
};
