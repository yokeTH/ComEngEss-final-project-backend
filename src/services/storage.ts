import S3 from 'aws-sdk/clients/s3.js';

const s3 = new S3({
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  accessKeyId: `${process.env.R2_ACCESS_KEY_ID}`,
  secretAccessKey: `${process.env.R2_ACCESS_KEY_SECRET}`,
  signatureVersion: 'v4',
});

const uploadFile = async (buffer: Buffer, key: string, contentType: string) => {
  const upload = await s3
    .upload({
      Bucket: 'cee',
      Key: key,
      ContentType: contentType,
      Body: buffer,
    })
    .promise();
  return upload;
};

const getUrl = async (key: string) => {
  const url = await s3.getSignedUrlPromise('getObject', { Bucket: 'cee', Key: key, Expires: 3600 });
  return url;
};

export { uploadFile, getUrl };
