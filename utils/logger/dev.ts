import { createLogger, format, transports } from "winston";

const devLogger = () => {
  const myFormat = format.printf(({ level, message, timestamp }) => {
    return `${timestamp} ${level}: ${message}`;
  });

  return createLogger({
    level: "debug",
    // format: winston.format.simple(),
    format: format.combine(
      format.colorize(),
      format.label({ label: "right meow!" }),
      format.timestamp({ format: "HH:mm:ss" }),
      myFormat
    ),

    //defaultMeta: { service: 'user-service' },
    transports: [new transports.Console()],
  });
};

export default devLogger;
