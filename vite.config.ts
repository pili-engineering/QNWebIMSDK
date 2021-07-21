import { defineConfig } from 'vite';
import reactRefresh from '@vitejs/plugin-react-refresh';

console.log('当前环境', process.env.NODE_ENV);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  server: {
    proxy: {
      '/v1': 'https://im-test.qiniuapi.com'
    }
  },
  base: './'
});
