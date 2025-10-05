import { createServer } from "../server";

const app = createServer();

export default function handler(req: any, res: any) {
	// Delegate to Express
	// @ts-ignore - express handler signature is compatible
	return app(req, res);
}
