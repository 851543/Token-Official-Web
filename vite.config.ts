import { defineConfig, loadEnv, Plugin } from 'vite'
import path from 'path'
import createVitePlugins from './vite/plugins'
import fs from 'fs-extra'

// 创建复制静态资源的插件
function copyAssetsPlugin(): Plugin {
  return {
    name: 'vite-plugin-copy-assets',
    async writeBundle() {
      try {
        // 确保目标目录存在
        await fs.ensureDir('dist/src/assets/live2d')
        await fs.ensureDir('dist/src/assets/live2d/dist')
        await fs.ensureDir('dist/src/assets/live2d/motions')
        await fs.ensureDir('dist/src/assets/live2d/model.1024')
        await fs.ensureDir('dist/src/data')
        await fs.ensureDir('dist/src/assets/images')
        
        // 复制 live2d 相关资源到正确的位置
        if (fs.existsSync('src/assets/live2d')) {
          console.log('Copying Live2D assets...')
          await fs.copy('src/assets/live2d', 'dist/src/assets/live2d')
        }

        // 复制 data 目录下的 JSON 文件到正确的位置
        if (fs.existsSync('src/data')) {
          console.log('Copying data directory...')
          await fs.copy('src/data', 'dist/src/data')
        }

        // 复制图片资源
        if (fs.existsSync('src/assets/images')) {
          console.log('Copying images...')
          await fs.copy('src/assets/images', 'dist/src/assets/images')
        }

        // 复制必要的静态资源
        const essentialFiles = [
          'index.html',
          'favicon.svg',
          'logo.svg'
        ]

        for (const file of essentialFiles) {
          if (fs.existsSync(`src/assets/${file}`)) {
            await fs.copy(`src/assets/${file}`, `dist/assets/${file}`)
          }
        }
      } catch (error) {
        console.error('Error copying assets:', error)
      }
    }
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd())
  const { VITE_APP_ENV } = env
  return {
    base: VITE_APP_ENV === 'production' ? '/' : '/',
    plugins: [
      ...createVitePlugins(env, command === 'build'),
      copyAssetsPlugin()
    ],
    resolve: {
      alias: {
        '~': path.resolve(__dirname, './'),
        '@': path.resolve(__dirname, './src'),
        '@data': path.resolve(__dirname, './src/data')
      },
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
    },
    server: {
      port: 85,
      host: true,
      open: true,
      proxy: {
        '/oauth': {
          target: 'https://aip.baidubce.com',
          changeOrigin: true,
          secure: false
        },
        '/rpc': {
          target: 'https://aip.baidubce.com',
          changeOrigin: true,
          secure: false
        }
      },
      fs: {
        allow: ['..']
      },
      cors: true
    },
    css: {
      postcss: {
        plugins: [
          {
            postcssPlugin: 'internal:charset-removal',
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === 'charset') {
                  atRule.remove()
                }
              },
            },
          },
        ],
      },
    },
    publicDir: 'public',
    assetsInclude: [
      '**/*.jpg', 
      '**/*.png', 
      '**/*.svg', 
      '**/*.gif',
      '**/*.ico',
      '**/*.webp',
      '**/*.json',
      '**/*.moc',
      '**/*.mtn',
    ],
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      rollupOptions: {
        input: {
          main: path.resolve(__dirname, 'index.html')
        },
        output: {
          format: 'es',
          assetFileNames: (assetInfo) => {
            const name = assetInfo.name || '';
            // 保持所有资源的原始路径结构
            if (name.includes('src/')) {
              return name;
            }
            return `assets/${name}`;
          },
          chunkFileNames: 'assets/[name].js',
          entryFileNames: 'assets/[name].js'
        }
      },
      emptyOutDir: true,
      sourcemap: true,
      assetsInlineLimit: 0,
      minify: false,
      target: 'es2015',
      cssTarget: 'chrome80'
    },
    define: {
      __VUE_I18N_FULL_INSTALL__: true,
      __VUE_I18N_LEGACY_API__: false,
      __INTLIFY_PROD_DEVTOOLS__: false,
      // 注入环境变量
      'import.meta.env': JSON.stringify(env)
    }
  }
})
