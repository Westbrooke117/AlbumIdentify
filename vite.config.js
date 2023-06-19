import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {VitePluginRadar} from "vite-plugin-radar";

// https://vitejs.dev/config/
export default defineConfig({
  base: '/AlbumIdentify/',
  plugins: [
      VitePluginRadar({
        analytics: {
          id: 'G-C0TYE3ZQEC'
        }
      }),
      react()
  ],
})