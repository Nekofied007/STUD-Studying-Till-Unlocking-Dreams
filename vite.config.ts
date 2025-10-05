import { defineConfig, Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
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
  plugins: [react(), expressPlugin()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./client"),
      "@shared": path.resolve(__dirname, "./shared"),
    },
  },
}));

function expressPlugin(): Plugin {
  return {
    name: "express-plugin",
    apply: "serve", // Only apply during development (serve mode)
    configureServer(server) {
      // Lazy-load the server only in dev to avoid importing Prisma at build time
      let app: any;
      const ensureServer = async () => {
        if (!app) {
          const mod = await import("./server/index.ts");
          app = mod.createServer();
        }
        return app;
      };

      // Only handle API routes; let Vite handle everything else (including index.html)
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
}
