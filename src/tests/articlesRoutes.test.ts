import request from 'supertest';
import app from '../index';  // Adjust the path based on your setup
import * as gptModule from '../gpt';  // Import the module containing findArticlesByTopic

jest.mock('../gpt');  // Automatically mock all exports from the gpt module

describe('GET /articles', () => {
  const mockArticles = [
    { id: 1, title: 'Mock Article 1', author: 'Mock Author', content: 'Summary of mock article 1' },
    { id: 2, title: 'Mock Article 2', author: 'Mock Author', content: 'Summary of mock article 2' },
  ];

  beforeEach(() => {
    (gptModule.findArticlesByTopic as jest.Mock).mockResolvedValue(mockArticles);
  });

  it('should return 400 if topic is missing', async () => {
    const response = await request(app).get('/articles');
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Invalid topic parameter');
  });

  it('should return 200 and an empty list if topic is empty', async () => {
    const response = await request(app).get('/articles').query({ topic: '' });
    expect(response.status).toBe(200);
    expect(response.body.articles).toEqual([]);
    expect(response.body.totalPages).toBe(1);
  });

  it('should return 200 and a list of articles if a valid topic is provided', async () => {
    const response = await request(app).get('/articles').query({ topic: 'science' });
    expect(response.status).toBe(200);
    expect(response.body.articles).toEqual(mockArticles);
    expect(response.body.articles.length).toBeGreaterThan(0);
  });
});
