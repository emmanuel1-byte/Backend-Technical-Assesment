import app from "./app";
import connectDatabase from "./src/utils/database";
import logger from "./src/utils/logger";
import { createServer } from "http";
import { config } from "dotenv";

const server = createServer(app);
const PORT = process.env.PORT || 3000;

/**
 * Configures the environment variables based on the current NODE_ENV setting.
 * Loads the appropriate .env file for 'development', 'staging', or 'production'
 * environments to ensure the application uses the correct configuration.
 */
if (process.env.NODE_ENV === "development") {
  config({ path: `.env.${process.env.NODE_ENV}` });
} else if (process.env.NODE_ENV === "staging") {
  config({ path: `.env.${process.env.NODE_ENV}` });
} else if (process.env.NODE_ENV === "production") {
  config({ path: `.env.${process.env.NODE_ENV}` });
}

server.listen(PORT, async () => {
  await connectDatabase();
  logger.info(
    `✅ Server successfully started and listening on port ${PORT}. Environment: ${process.env.NODE_ENV}`
  );
});
