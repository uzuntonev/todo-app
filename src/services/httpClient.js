import axios from 'axios';
const config = {
  baseURL:
    'https://webhooks.mongodb-stitch.com/api/client/v2.0/app/todos-ipuar/service/httpClient/incoming_webhook/'
};

const http = axios.create(config);

export { http };
