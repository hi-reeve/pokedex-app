import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import { resolve } from "path";
import { VitePWA } from "vite-plugin-pwa";
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        reactRefresh(),
        VitePWA({
            registerType: "autoUpdate",
            manifest: {
                name: "pokedex pokemon app",
                short_name: "pokedex",
                start_url: ".",
                display: "standalone",
                background_color: "#FFFFFF",
                theme_color: "#FFFFFF",
                icons: [
                    {
                        src: "/favicon/apple-icon-57x57.png",
                        sizes: "57x57",
                        type: "image/png",
                    },
                    {
                        src: "/favicon/apple-icon-60x60.png",
                        sizes: "60x60",
                        type: "image/png",
                    },
                    {
                        src: "/favicon/apple-icon-72x72.png",
                        sizes: "72x72",
                        type: "image/png",
                    },
                    {
                        src: "/favicon/apple-icon-76x76.png",
                        sizes: "76x76",
                        type: "image/png",
                    },
                    {
                        src: "/favicon/apple-icon-114x114.png",
                        sizes: "114x114",
                        type: "image/png",
                    },
                    {
                        src: "/favicon/apple-icon-120x120.png",
                        sizes: "120x120",
                        type: "image/png",
                    },
                    {
                        src: "/favicon/apple-icon-144x144.png",
                        sizes: "144x144",
                        type: "image/png",
                    },
                    {
                        src: "/favicon/apple-icon-152x152.png",
                        sizes: "152x152",
                        type: "image/png",
                    },
                    {
                        src: "/favicon/apple-icon-180x180.png",
                        sizes: "180x180",
                        type: "image/png",
                    },
                    {
                        src: "/favicon/android-icon-36x36.png",
                        sizes: "36x36",
                        type: "image/png",
                    },
                    {
                        src: "/favicon/android-icon-48x48.png",
                        sizes: "48x48",
                        type: "image/png",
                        density: "1.0",
                    },
                    {
                        src: "/favicon/android-icon-72x72.png",
                        sizes: "72x72",
                        type: "image/png",
                        density: "1.5",
                    },
                    {
                        src: "/favicon/android-icon-96x96.png",
                        sizes: "96x96",
                        type: "image/png",
                        density: "2.0",
                    },
                    {
                        src: "/favicon/android-icon-144x144.png",
                        sizes: "144x144",
                        type: "image/png",
                        density: "3.0",
                    },
                    {
                        src: "/favicon/android-icon-192x192.png",
                        sizes: "192x192",
                        type: "image/png",
                        density: "4.0",
                    },
                    {
                        src: "/favicon/ms-icon-70x70.png",
                        sizes: "70x70",
                        type: "image/png",
                    },
                    {
                        src: "/favicon/ms-icon-144x144.png",
                        sizes: "144x144",
                        type: "image/png",
                    },
                    {
                        src: "/favicon/ms-icon-150x150.png",
                        sizes: "150x150",
                        type: "image/png",
                    },
                    {
                        src: "/favicon/ms-icon-310x310.png",
                        sizes: "310x310",
                        type: "image/png",
                    },
                ],
            },
        }),
    ],
    resolve: {
        alias: {
            "@": resolve(__dirname, "./src"),
        },
    },
});
