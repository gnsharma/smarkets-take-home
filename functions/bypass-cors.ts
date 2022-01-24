import fetch from 'node-fetch';
import { Handler } from '@netlify/functions';

const handler: Handler = async (event) => {
  const response = await fetch(event.queryStringParameters.url)
    .then((response) => response.json())
    .catch((error) => console.error(error));
  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
    body: JSON.stringify(response),
  };
};

export { handler };
