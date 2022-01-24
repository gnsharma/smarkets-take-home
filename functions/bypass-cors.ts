import fetch from 'node-fetch';
import { Handler } from '@netlify/functions';

const handler: Handler = async (event) => {
  const queryParams = event.queryStringParameters;
  const url = queryParams.url;
  delete queryParams.url;

  let queryParamsString = '';
  Object.entries(queryParams).forEach(([param, value]) => {
    const values = value.split(', ');
    values.forEach((value) => {
      queryParamsString += `&${param}=${value}`;
    });
  });

  const response = await fetch(`${url}${queryParamsString}`)
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
