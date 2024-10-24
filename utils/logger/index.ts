import winston from "winston";
import devLogger from "./dev";
import productionLogger from "./production";
import testLogger from "./test";

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6,
};

let logger: winston.Logger | Console | null = null;

if (process.env.NODE_ENV === "dev") {
  logger = devLogger();
}

if (process.env.NODE_ENV === "production") {
  logger = productionLogger();
}

if (process.env.NODE_ENV === "test") {
  logger = testLogger();
}
export default logger;
