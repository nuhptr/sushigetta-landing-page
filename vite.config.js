import path from "node:path"
import { defineConfig } from "vite"
import injectHTML from "vite-plugin-html-inject"

export default defineConfig({
    resolve: {
        alias: {
            "@": path.resolve(import.meta.dirname, "src"),
        },
    },
    plugins: [injectHTML()],
})
