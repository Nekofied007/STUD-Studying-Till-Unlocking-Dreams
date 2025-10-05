import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ command }) => {
  const cfg: any = {
    server: {
      host: "::",
      port: 8080,
      fs: {
        // Include absolute project paths so index.html at repo root is served in dev
        allow: [
          path.resolve(__dirname, "."),
          path.resolve(__dirname, "client"),
          path.resolve(__dirname, "shared"),
        ],
        deny: [".env", ".env.*", "*.{crt,pem}", "**/.git/**", "server/**"],
      },
    },
    build: {
      outDir: "dist/spa",
    },
  plugins: [react()] as unknown as Plugin[],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./client"),
        "@shared": path.resolve(__dirname, "./shared"),
      },
    },
  };

  // Only attach Express dev plugin in serve mode; avoid any static reference to server code
  if (command === "serve") {
    const devPlugin: Plugin = {
      name: "express-plugin",
      apply: "serve",
      configureServer(server) {
        let app: any;
        const serverEntry = "./" + "server/index.ts"; // non-static to avoid bundler resolving
        const ensureServer = async () => {
          if (!app) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
            const mod: any = await import(serverEntry);
            app = mod.createServer();
          }
          return app;
        };

        server.middlewares.use((req, res, next) => {
          const url = req.url || "";
          if (url.startsWith("/api/")) {
            ensureServer().then((appInstance) => (appInstance as any)(req, res, next));
            return;
          }
          return next();
        });
      },
    };
  (cfg.plugins as unknown as Plugin[]).push(devPlugin);
  }

  return cfg;
});

