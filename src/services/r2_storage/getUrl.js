import { join } from 'path';
const baseUrl = process.env.R2_PUBLIC_HOST || '';

async function getUrl(key) {
  return 'https://' + join(baseUrl, key);
}

export default getUrl;
