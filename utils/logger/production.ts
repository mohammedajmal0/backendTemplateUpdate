import { createLogger, format, transports } from "winston";
const { combine, timestamp, label, printf, json } = format;

const productionLogger = () => {
  return createLogger({
    level: "info",
    // format: winston.format.simple(),
    format: combine(timestamp(), json()),

    defaultMeta: { service: "user-service" },
    transports: [
      new transports.Console(),
      new transports.File({
        filename: "prod.errors.log",
      }),
    ],
  });
};

export default productionLogger;
