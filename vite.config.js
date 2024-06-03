// import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import { loadEnv } from 'vite'
// https://vitejs.dev/config/
// export default defineConfig({
//   // base:'/voksen-annoncer/',

//   plugins: [react()],
// })

// export default defineConfig(({ mode }) => {
//   // Load environment variables based on the mode (development or production)
//   const env = loadEnv(mode, process.cwd())

//   return {
//     base: env.VITE_BASE_PATH,  // Set the base path from the environment variable
//     plugins: [react()],
//   }
// })



import { defineConfig, loadEnv } from 'vite'

export default defineConfig(({ mode }) => {
  // Load environment variables based on the current mode (e.g., development or production)
  const env = loadEnv(mode, process.cwd())
  return {
    base: env.VITE_BASE_PATH,
    // base: '/voksen-annoncer/',
    plugins: [react()],
    // Add this to make sure environment variables are available to your application
    define: {
      'process.env': env
    }
  }
})

