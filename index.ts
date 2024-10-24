import { variables } from "./config/envLoader";
import Server from "./server";

const start=async ()=>{
    try {
        const { PORT } = variables;
        const app = new Server();
        app.start(Number(PORT));
      } catch (error) {
        console.error(error);
        process.exit(1);
      }
}
start();

process.on("SIGTERM", (signal) => {
    console.debug(signal);
    console.debug(`Process ${process.pid} received a SIGTERM signal`);
    process.exit(0);
  });
  
  process.on("SIGINT", (signal) => {
    console.debug(signal);
    console.debug(`Process ${process.pid} has been interrupted`);
    process.exit(0);
  });
  
  process.on("uncaughtException", (err) => {
    console.error(err);
    console.error(`Uncaught Exception: ${err.message}`);
    process.exit(1);
  });
  