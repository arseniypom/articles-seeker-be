# Articles Seeker Backend

This is the backend part of the Articles Seeker application, a service that provides scientific articles based on a given topic. It uses OpenAI's API to fetch relevant articles and is designed to be secure, efficient, and easy to use. The frontend part of the application is deployed on Vercel, and the backend is built using Express, TypeScript, and other modern web technologies.

## Table of Contents

- [Requirements](#requirements)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Deployment](#deployment)
- [Links](#links)
- [License](#license)

## Requirements

- Node.js v20 or higher
- npm v10 or higher
- OpenAI API key
- GigaChat API credentials (Client Secret, Auth Data)

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/articles-seeker-be.git
   cd articles-seeker-be
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

## Configuration

Before running the application, you need to configure the environment variables. Create a `.env` file in the root directory and add the following:

```plaintext
PORT=3000
OPENAI_API_KEY=your-openai-api-key
GIGACHAT_CLIENT_SECRET=your-gigachat-client-secret
GIGACHAT_AUTH_DATA=your-gigachat-auth-data
```

## Usage

### Development

To start the development server with hot-reloading:

```bash
npm start
```

### Production

To build the application and start the production server:

```bash
npm run build
npm run start:prod
```

## API Endpoints

### `GET /articles`

Fetches a list of articles based on the given topic.

#### Query Parameters:

- `topic` (string) - The topic to search for. This parameter is required.
- `page` (number) - The page number for pagination. Defaults to 1.
- `model` (string) - The AI model to use (`ChatGPT` or `GigaChat`). Optional.

#### Response:

```json
{
  "topic": "your-topic",
  "articles": [
    {
      "id": 1,
      "title": "Article Title",
      "author": "Author Name",
      "content": "Summary of the article"
    }
  ],
  "totalPages": 10
}
```

## Deployment

This backend service is intended to be deployed on a Node.js server. You can use any Node.js hosting provider or deploy it on your own server.

## Links

- **Frontend Deployment**: [Articles Seeker Frontend](https://articles-seeker-fe.vercel.app/)
- **Frontend Repository**: [GitHub - articles-seeker-fe](https://github.com/arseniypom/articles-seeker-fe)

## License

This project is licensed under the ISC License.