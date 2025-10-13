import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 5173,  // ローカル開発ポート（http://localhost:5173）
        open: true   // 起動時にブラウザで自動オープン
    },
    resolve: {
        alias: {
            "@": "/src"  // "@/components/〜" みたいに絶対パスでimportできる
        }
    }
});