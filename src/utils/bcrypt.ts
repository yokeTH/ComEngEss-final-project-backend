import crypto from 'crypto';

const generateSalt = (length: number): string =>
  crypto
    .randomBytes(Math.ceil(length / 2))
    .toString('hex')
    .slice(0, length);

const hashPassword = (password: string, salt: string): string => {
  const hash = crypto.createHmac('sha256', salt);
  hash.update(password);
  return hash.digest('base64url');
};

export const bcryptHash = async (password: string, saltLength: number) => {
  const salt = generateSalt(10);
  const hashed = hashPassword(password, salt);
  const storedHashedPassword = `$2b\$${saltLength}\$${salt}${hashed}`;
  return storedHashedPassword;
};

export const bcryptCompare = async (password: string, hashedPassword: string) => {
  const [_, _2b, length, combination] = hashedPassword.split('$');
  const salt = combination.slice(0, Number(length));
  const hashed = combination.slice(Number(length));
  return hashed === hashPassword(password, salt);
};
