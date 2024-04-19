// https://docs.aws.amazon.com/AmazonS3/latest/API/sig-v4-authenticating-requests.html
//
import crypto from 'crypto';
import { getSignature, getSigningKey } from './signSignature';

const accountId = process.env.R2_ACCOUNT_ID || '';
const bucketName = 'cee';
const accessKeyId = process.env.R2_ACCESS_KEY_ID || '';
const secretAccessKey = process.env.R2_ACCESS_KEY_SECRET || '';
const region = 'apac';
const host = `${accountId}.r2.cloudflarestorage.com`;

async function uploadFile(fileContent: Buffer, key: string, contentType: string) {
  const url = `https://${host}/${bucketName}/${key}`;
  const timestamp = new Date().toISOString().replace(/[:\-]|\.\d{3}/g, '');
  const date = timestamp.slice(0, 8);
  const amzDate = timestamp.slice(0, 15) + 'Z';

  const credentialScope = `${date}/${region}/s3/aws4_request`;
  const canonicalRequest = `PUT\n/${bucketName}/${key}\n\nhost:${accountId}.r2.cloudflarestorage.com\nx-amz-content-sha256:${crypto.createHash('sha256').update(fileContent).digest('hex')}\nx-amz-date:${amzDate}\n\nhost;x-amz-content-sha256;x-amz-date\n${crypto.createHash('sha256').update(fileContent).digest('hex')}`;
  const stringToSign = `AWS4-HMAC-SHA256\n${amzDate}\n${credentialScope}\n${crypto.createHash('sha256').update(canonicalRequest).digest('hex')}`;
  const signingKey = getSigningKey(secretAccessKey, date, region);
  const signature = getSignature(signingKey, stringToSign);

  const response = await fetch(url, {
    method: 'PUT',
    headers: {
      'Content-Type': contentType,
      'x-amz-date': amzDate,
      Authorization: `AWS4-HMAC-SHA256 Credential=${accessKeyId}/${credentialScope}, SignedHeaders=host;x-amz-content-sha256;x-amz-date, Signature=${signature}`,
      'x-amz-content-sha256': crypto.createHash('sha256').update(fileContent).digest('hex'),
    },
    body: fileContent,
  });

  if (response.ok) {
    return key;
  } else {
    throw new Error('upload not successful');
  }
}

export default uploadFile;
