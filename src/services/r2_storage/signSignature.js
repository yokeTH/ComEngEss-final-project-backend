import crypto from 'crypto';

const getSigningKey = (secretAccessKey, date, region) => {
  const dateKey = crypto.createHmac('sha256', `AWS4${secretAccessKey}`).update(date).digest();
  const regionKey = crypto.createHmac('sha256', dateKey).update(region).digest();
  const serviceKey = crypto.createHmac('sha256', regionKey).update('s3').digest();
  return crypto.createHmac('sha256', serviceKey).update('aws4_request').digest();
};

const getSignature = (signingKey, stringToSign) => crypto.createHmac('sha256', signingKey).update(stringToSign).digest('hex');

export { getSignature, getSigningKey };
