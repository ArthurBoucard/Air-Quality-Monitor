import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from "url";

export default ({ mode }) => {

    process.env = {...process.env, ...loadEnv(mode, process.cwd())};

    return defineConfig({
    //   base: "/Thoughtful/",
    
      plugins: [vue()],
      resolve: {
        alias: {
          "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
      },
      server: {
        port: 3000,
        // host: process.env.VITE_BACKEND_HOST || "localhost:8080",
        // proxy: {
        //   "^/api": {
        //     target: process.env.VITE_BACKEND_URL || "http://localhost:8080",
        //     ws: true,
        //     rewrite: (path) => path.replace("/api", ""),
        //   },
        // },
      }
    })
};
