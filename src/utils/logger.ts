import { createLogger, format, transports } from 'winston';

const date = new Date(Date.now());
const logger = createLogger({
  level: 'info',
  format: format.combine(
    format.colorize(),
    format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss' }),
    format.simple(),
    format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`),
  ),
  transports: [new transports.File({ filename: `logs/${date.toDateString()}.log` }), new transports.Console()],
});

export default logger;
