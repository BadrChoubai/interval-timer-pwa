import {fileURLToPath, URL} from 'node:url'
import {VitePWA} from 'vite-plugin-pwa'
import replace from '@rollup/plugin-replace'

import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        VitePWA({
                registerType: 'autoUpdate',
                injectRegister: 'auto',
                includeAssets: ['favicon.ico', 'apple-touch-icon-512x512.png', 'maskable-icon-512x512.svg'],
                manifest: {
                    name: 'PWA Starter',
                    short_name: 'PWA Starter',
                    description: 'A PWA Start Template',
                    theme_color: '#F7454BFF',
                    icons: [
                        {
                            src: 'pwa-64x64.png',
                            sizes: '64x64',
                            type: 'image/png'
                        },
                        {
                            src: 'pwa-192x192.png',
                            sizes: '192x192',
                            type: 'image/png'
                        },
                        {
                            src: 'pwa-512x512.png',
                            sizes: '512x512',
                            type: 'image/png'
                        }
                    ]
                }
        }
        ),
        replace({
            __DATE__: new Date().toISOString(),
        }),
    ],
    resolve: {
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})
