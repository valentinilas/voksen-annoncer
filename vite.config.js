import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { loadEnv } from 'vite'
// https://vitejs.dev/config/
// export default defineConfig({
//   // base:'/voksen-annoncer/',

//   plugins: [react()],
// })

export default defineConfig(({ mode }) => {
  // Load environment variables based on the mode (development or production)
  const env = loadEnv(mode, process.cwd())

  return {
    base: env.VITE_BASE_PATH,  // Set the base path from the environment variable
    plugins: [react()],
  }
})
