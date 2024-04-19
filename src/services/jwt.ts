import crypto from 'crypto';

const jwtSign = async (payload: any, secret?: string) => {
  const headers = {
    alg: 'HS256',
    typ: 'JWT',
  };
  const base64Headers = btoa(JSON.stringify(headers));
  const base64Payload = btoa(JSON.stringify(payload));
  const signature = crypto
    .createHmac('sha256', secret || '')
    .update(`${base64Headers}.${base64Payload}`)
    .digest('base64url');
  return `${base64Headers}.${base64Payload}.${signature}`;
};

const jwtVerify = async (token: string, secret?: string) => {
  const [base64Headers, base64Payload, signature] = token.split('.');

  const headers = JSON.parse(atob(base64Headers));
  const payload = JSON.parse(atob(base64Payload));

  const recreatedSignature = crypto
    .createHmac('sha256', secret || '')
    .update(`${base64Headers}.${base64Payload}`)
    .digest('base64url');

  if (recreatedSignature === signature) {
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) {
      throw new Error('Token expired');
    }
    return payload;
  } else {
    throw new Error('Invalid token');
  }
};

export { jwtSign, jwtVerify };
