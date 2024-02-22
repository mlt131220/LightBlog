import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import UnoCss from 'unocss/vite';
import presetUno from '@unocss/preset-uno';
import presetAttributify from '@unocss/preset-attributify';
import presetIcons from '@unocss/preset-icons';

export default defineConfig(mode => {
    const env = loadEnv(mode.mode, process.cwd());

	return {
		plugins: [
			react(),
			UnoCss({
				presets: [presetUno(), presetAttributify(), presetIcons()],
			}),
		],
		resolve: {
			alias: {
				'@': resolve(__dirname, 'src'), // 路径别名
				'#': resolve(__dirname, 'src/types'),
			},
			extensions: ['.js', '.jsx', '.tsx', '.ts'], // 使用路径别名时想要省略的后缀名，可以自己 增减
		},
		server: {
			proxy: {
				[env.VITE_GLOB_API_URL]: {
					target: env.VITE_GLOB_DOMAIN_URL + 'api/blog',
					changeOrigin: true,
					rewrite: path => path.replace(env.VITE_GLOB_API_URL, ''),
				},
				'^/static/upload': {
					target: env.VITE_UPYUN_URL,
					changeOrigin: true,
					rewrite: (path) => path.replace(new RegExp(`^/static/upload`), '/static/upload')
				},
			},
		},
	};
});
