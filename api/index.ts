import { createServer } from "../server";

// Create the Express app once per function instance
const app = createServer();

// Vercel Node serverless functions can export an Express handler directly
export default app;
