// vite.config.ts
import { defineConfig, loadEnv } from "file:///E:/CodeProject/Token-Official-Web/node_modules/vite/dist/node/index.js";
import path2 from "path";

// vite/plugins/index.ts
import vue from "file:///E:/CodeProject/Token-Official-Web/node_modules/@vitejs/plugin-vue/dist/index.mjs";

// vite/plugins/auto-import.ts
import autoImport from "file:///E:/CodeProject/Token-Official-Web/node_modules/unplugin-auto-import/dist/vite.js";
function createAutoImport() {
  return autoImport({
    imports: [
      "vue",
      "vue-router",
      "pinia"
    ],
    dts: false
  });
}

// vite/plugins/svg-icon.ts
import { createSvgIconsPlugin } from "file:///E:/CodeProject/Token-Official-Web/node_modules/vite-plugin-svg-icons/dist/index.mjs";
import path from "path";
function createSvgIcon(isBuild) {
  return createSvgIconsPlugin({
    iconDirs: [path.resolve(process.cwd(), "src/assets/icons/svg")],
    symbolId: "icon-[dir]-[name]",
    svgoOptions: isBuild
  });
}

// vite/plugins/compression.ts
import compression from "file:///E:/CodeProject/Token-Official-Web/node_modules/vite-plugin-compression/dist/index.mjs";
function createCompression(env) {
  const { VITE_BUILD_COMPRESS } = env;
  const plugin = [];
  if (VITE_BUILD_COMPRESS) {
    const compressList = VITE_BUILD_COMPRESS.split(",");
    if (compressList.includes("gzip")) {
      plugin.push(
        compression({
          ext: ".gz",
          deleteOriginFile: false
        })
      );
    }
    if (compressList.includes("brotli")) {
      plugin.push(
        compression({
          ext: ".br",
          algorithm: "brotliCompress",
          deleteOriginFile: false
        })
      );
    }
  }
  return plugin;
}

// vite/plugins/setup-extend.ts
import setupExtend from "file:///E:/CodeProject/Token-Official-Web/node_modules/unplugin-vue-setup-extend-plus/dist/vite.js";
function createSetupExtend() {
  return setupExtend({});
}

// vite/plugins/index.ts
function createVitePlugins(viteEnv, isBuild = false) {
  const vitePlugins = [vue()];
  vitePlugins.push(createAutoImport());
  vitePlugins.push(createSetupExtend());
  vitePlugins.push(createSvgIcon(isBuild));
  isBuild && vitePlugins.push(...createCompression(viteEnv));
  return vitePlugins;
}

// vite.config.ts
import fs from "file:///E:/CodeProject/Token-Official-Web/node_modules/fs-extra/lib/index.js";
var __vite_injected_original_dirname = "E:\\CodeProject\\Token-Official-Web";
function copyJsonPlugin() {
  return {
    name: "vite-plugin-copy-json",
    enforce: "post",
    async buildStart() {
      console.log("Starting to copy JSON files...");
      try {
        await fs.ensureDir("dist/src/data");
        await fs.copy("src/data", "dist/src/data", {
          filter: (src) => {
            const isJson = src.endsWith(".json");
            if (isJson) {
              console.log("Copying:", src);
            }
            return isJson;
          },
          overwrite: true
        });
        console.log("JSON files copied successfully!");
      } catch (error) {
        console.error("Error copying JSON files:", error);
      }
    }
  };
}
var vite_config_default = defineConfig(({ mode, command }) => {
  const env = loadEnv(mode, process.cwd());
  const { VITE_APP_ENV } = env;
  return {
    // 部署生产环境和开发环境下的URL。
    // 默认情况下，vite 会假设你的应用是被部署在一个域名的根路径上
    // 例如 https://www.ruoyi.vip/。如果应用被部署在一个子路径上，你就需要用这个选项指定这个子路径。例如，如果你的应用被部署在 https://www.ruoyi.vip/admin/，则设置 baseUrl 为 /admin/。
    base: VITE_APP_ENV === "production" ? "/" : "/",
    plugins: [
      ...createVitePlugins(env, command === "build"),
      copyJsonPlugin()
    ],
    resolve: {
      // https://cn.vitejs.dev/config/#resolve-alias
      alias: {
        // 设置路径
        "~": path2.resolve(__vite_injected_original_dirname, "./"),
        // 设置别名
        "@": path2.resolve(__vite_injected_original_dirname, "./src"),
        "@data": path2.resolve(__vite_injected_original_dirname, "./src/data")
      },
      // https://cn.vitejs.dev/config/#resolve-extensions
      extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue"]
    },
    // vite 相关配置
    server: {
      port: 85,
      host: true,
      open: true,
      proxy: {
        "/oauth": {
          target: "https://aip.baidubce.com",
          changeOrigin: true,
          secure: false
        },
        "/rpc": {
          target: "https://aip.baidubce.com",
          changeOrigin: true,
          secure: false
        },
        // 代理 JSON 文件请求
        "/src/data": {
          target: "http://localhost:85",
          changeOrigin: true,
          rewrite: (path3) => path3
        }
      },
      fs: {
        // 允许服务 src 目录下的文件
        allow: [".."]
      },
      cors: true
    },
    //fix:error:stdin>:7356:1: warning: "@charset" must be the first rule in the file
    css: {
      postcss: {
        plugins: [
          {
            postcssPlugin: "internal:charset-removal",
            AtRule: {
              charset: (atRule) => {
                if (atRule.name === "charset") {
                  atRule.remove();
                }
              }
            }
          }
        ]
      }
    },
    // 添加静态资源处理
    publicDir: "public",
    assetsInclude: ["**/*.jpg", "**/*.png", "**/*.svg", "**/*.json"],
    build: {
      outDir: "dist",
      assetsDir: "assets",
      rollupOptions: {
        input: {
          main: path2.resolve(__vite_injected_original_dirname, "index.html")
        }
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAidml0ZS9wbHVnaW5zL2luZGV4LnRzIiwgInZpdGUvcGx1Z2lucy9hdXRvLWltcG9ydC50cyIsICJ2aXRlL3BsdWdpbnMvc3ZnLWljb24udHMiLCAidml0ZS9wbHVnaW5zL2NvbXByZXNzaW9uLnRzIiwgInZpdGUvcGx1Z2lucy9zZXR1cC1leHRlbmQudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxDb2RlUHJvamVjdFxcXFxUb2tlbi1PZmZpY2lhbC1XZWJcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXENvZGVQcm9qZWN0XFxcXFRva2VuLU9mZmljaWFsLVdlYlxcXFx2aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovQ29kZVByb2plY3QvVG9rZW4tT2ZmaWNpYWwtV2ViL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnLCBsb2FkRW52LCBQbHVnaW4gfSBmcm9tICd2aXRlJ1xyXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJ1xyXG5pbXBvcnQgY3JlYXRlVml0ZVBsdWdpbnMgZnJvbSAnLi92aXRlL3BsdWdpbnMnXHJcbmltcG9ydCBmcyBmcm9tICdmcy1leHRyYSdcclxuXHJcbi8vIFx1NTIxQlx1NUVGQSBKU09OIFx1NTkwRFx1NTIzNlx1NjNEMlx1NEVGNlxyXG5mdW5jdGlvbiBjb3B5SnNvblBsdWdpbigpOiBQbHVnaW4ge1xyXG4gIHJldHVybiB7XHJcbiAgICBuYW1lOiAndml0ZS1wbHVnaW4tY29weS1qc29uJyxcclxuICAgIGVuZm9yY2U6ICdwb3N0JyBhcyBjb25zdCxcclxuICAgIGFzeW5jIGJ1aWxkU3RhcnQoKSB7XHJcbiAgICAgIGNvbnNvbGUubG9nKCdTdGFydGluZyB0byBjb3B5IEpTT04gZmlsZXMuLi4nKTtcclxuICAgICAgdHJ5IHtcclxuICAgICAgICAvLyBcdTc4NkVcdTRGRERcdTc2RUVcdTY4MDdcdTc2RUVcdTVGNTVcdTVCNThcdTU3MjhcclxuICAgICAgICBhd2FpdCBmcy5lbnN1cmVEaXIoJ2Rpc3Qvc3JjL2RhdGEnKTtcclxuICAgICAgICAvLyBcdTU5MERcdTUyMzZcdTYyNDBcdTY3MDkgSlNPTiBcdTY1ODdcdTRFRjZcclxuICAgICAgICBhd2FpdCBmcy5jb3B5KCdzcmMvZGF0YScsICdkaXN0L3NyYy9kYXRhJywge1xyXG4gICAgICAgICAgZmlsdGVyOiAoc3JjKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGlzSnNvbiA9IHNyYy5lbmRzV2l0aCgnLmpzb24nKTtcclxuICAgICAgICAgICAgaWYgKGlzSnNvbikge1xyXG4gICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdDb3B5aW5nOicsIHNyYyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIGlzSnNvbjtcclxuICAgICAgICAgIH0sXHJcbiAgICAgICAgICBvdmVyd3JpdGU6IHRydWVcclxuICAgICAgICB9KTtcclxuICAgICAgICBjb25zb2xlLmxvZygnSlNPTiBmaWxlcyBjb3BpZWQgc3VjY2Vzc2Z1bGx5IScpO1xyXG4gICAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICAgIGNvbnNvbGUuZXJyb3IoJ0Vycm9yIGNvcHlpbmcgSlNPTiBmaWxlczonLCBlcnJvcik7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbi8vIGh0dHBzOi8vdml0ZS5kZXYvY29uZmlnL1xyXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoKHsgbW9kZSwgY29tbWFuZCB9KSA9PiB7XHJcbiAgY29uc3QgZW52ID0gbG9hZEVudihtb2RlLCBwcm9jZXNzLmN3ZCgpKVxyXG4gIGNvbnN0IHsgVklURV9BUFBfRU5WIH0gPSBlbnZcclxuICByZXR1cm4ge1xyXG4gICAgLy8gXHU5MEU4XHU3RjcyXHU3NTFGXHU0RUE3XHU3M0FGXHU1ODgzXHU1NDhDXHU1RjAwXHU1M0QxXHU3M0FGXHU1ODgzXHU0RTBCXHU3Njg0VVJMXHUzMDAyXHJcbiAgICAvLyBcdTlFRDhcdThCQTRcdTYwQzVcdTUxQjVcdTRFMEJcdUZGMEN2aXRlIFx1NEYxQVx1NTA0N1x1OEJCRVx1NEY2MFx1NzY4NFx1NUU5NFx1NzUyOFx1NjYyRlx1ODhBQlx1OTBFOFx1N0Y3Mlx1NTcyOFx1NEUwMFx1NEUyQVx1NTdERlx1NTQwRFx1NzY4NFx1NjgzOVx1OERFRlx1NUY4NFx1NEUwQVxyXG4gICAgLy8gXHU0RjhCXHU1OTgyIGh0dHBzOi8vd3d3LnJ1b3lpLnZpcC9cdTMwMDJcdTU5ODJcdTY3OUNcdTVFOTRcdTc1MjhcdTg4QUJcdTkwRThcdTdGNzJcdTU3MjhcdTRFMDBcdTRFMkFcdTVCNTBcdThERUZcdTVGODRcdTRFMEFcdUZGMENcdTRGNjBcdTVDMzFcdTk3MDBcdTg5ODFcdTc1MjhcdThGRDlcdTRFMkFcdTkwMDlcdTk4NzlcdTYzMDdcdTVCOUFcdThGRDlcdTRFMkFcdTVCNTBcdThERUZcdTVGODRcdTMwMDJcdTRGOEJcdTU5ODJcdUZGMENcdTU5ODJcdTY3OUNcdTRGNjBcdTc2ODRcdTVFOTRcdTc1MjhcdTg4QUJcdTkwRThcdTdGNzJcdTU3MjggaHR0cHM6Ly93d3cucnVveWkudmlwL2FkbWluL1x1RkYwQ1x1NTIxOVx1OEJCRVx1N0Y2RSBiYXNlVXJsIFx1NEUzQSAvYWRtaW4vXHUzMDAyXHJcbiAgICBiYXNlOiBWSVRFX0FQUF9FTlYgPT09ICdwcm9kdWN0aW9uJyA/ICcvJyA6ICcvJyxcclxuICAgIHBsdWdpbnM6IFtcclxuICAgICAgLi4uY3JlYXRlVml0ZVBsdWdpbnMoZW52LCBjb21tYW5kID09PSAnYnVpbGQnKSxcclxuICAgICAgY29weUpzb25QbHVnaW4oKVxyXG4gICAgXSxcclxuICAgIHJlc29sdmU6IHtcclxuICAgICAgLy8gaHR0cHM6Ly9jbi52aXRlanMuZGV2L2NvbmZpZy8jcmVzb2x2ZS1hbGlhc1xyXG4gICAgICBhbGlhczoge1xyXG4gICAgICAgIC8vIFx1OEJCRVx1N0Y2RVx1OERFRlx1NUY4NFxyXG4gICAgICAgICd+JzogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vJyksXHJcbiAgICAgICAgLy8gXHU4QkJFXHU3RjZFXHU1MjJCXHU1NDBEXHJcbiAgICAgICAgJ0AnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMnKSxcclxuICAgICAgICAnQGRhdGEnOiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi9zcmMvZGF0YScpXHJcbiAgICAgIH0sXHJcbiAgICAgIC8vIGh0dHBzOi8vY24udml0ZWpzLmRldi9jb25maWcvI3Jlc29sdmUtZXh0ZW5zaW9uc1xyXG4gICAgICBleHRlbnNpb25zOiBbJy5tanMnLCAnLmpzJywgJy50cycsICcuanN4JywgJy50c3gnLCAnLmpzb24nLCAnLnZ1ZSddLFxyXG4gICAgfSxcclxuICAgIC8vIHZpdGUgXHU3NkY4XHU1MTczXHU5MTREXHU3RjZFXHJcbiAgICBzZXJ2ZXI6IHtcclxuICAgICAgcG9ydDogODUsXHJcbiAgICAgIGhvc3Q6IHRydWUsXHJcbiAgICAgIG9wZW46IHRydWUsXHJcbiAgICAgIHByb3h5OiB7XHJcbiAgICAgICAgJy9vYXV0aCc6IHtcclxuICAgICAgICAgIHRhcmdldDogJ2h0dHBzOi8vYWlwLmJhaWR1YmNlLmNvbScsXHJcbiAgICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXHJcbiAgICAgICAgICBzZWN1cmU6IGZhbHNlXHJcbiAgICAgICAgfSxcclxuICAgICAgICAnL3JwYyc6IHtcclxuICAgICAgICAgIHRhcmdldDogJ2h0dHBzOi8vYWlwLmJhaWR1YmNlLmNvbScsXHJcbiAgICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXHJcbiAgICAgICAgICBzZWN1cmU6IGZhbHNlXHJcbiAgICAgICAgfSxcclxuICAgICAgICAvLyBcdTRFRTNcdTc0MDYgSlNPTiBcdTY1ODdcdTRFRjZcdThCRjdcdTZDNDJcclxuICAgICAgICAnL3NyYy9kYXRhJzoge1xyXG4gICAgICAgICAgdGFyZ2V0OiAnaHR0cDovL2xvY2FsaG9zdDo4NScsXHJcbiAgICAgICAgICBjaGFuZ2VPcmlnaW46IHRydWUsXHJcbiAgICAgICAgICByZXdyaXRlOiAocGF0aCkgPT4gcGF0aFxyXG4gICAgICAgIH1cclxuICAgICAgfSxcclxuICAgICAgZnM6IHtcclxuICAgICAgICAvLyBcdTUxNDFcdThCQjhcdTY3MERcdTUyQTEgc3JjIFx1NzZFRVx1NUY1NVx1NEUwQlx1NzY4NFx1NjU4N1x1NEVGNlxyXG4gICAgICAgIGFsbG93OiBbJy4uJ11cclxuICAgICAgfSxcclxuICAgICAgY29yczogdHJ1ZVxyXG4gICAgfSxcclxuICAgIC8vZml4OmVycm9yOnN0ZGluPjo3MzU2OjE6IHdhcm5pbmc6IFwiQGNoYXJzZXRcIiBtdXN0IGJlIHRoZSBmaXJzdCBydWxlIGluIHRoZSBmaWxlXHJcbiAgICBjc3M6IHtcclxuICAgICAgcG9zdGNzczoge1xyXG4gICAgICAgIHBsdWdpbnM6IFtcclxuICAgICAgICAgIHtcclxuICAgICAgICAgICAgcG9zdGNzc1BsdWdpbjogJ2ludGVybmFsOmNoYXJzZXQtcmVtb3ZhbCcsXHJcbiAgICAgICAgICAgIEF0UnVsZToge1xyXG4gICAgICAgICAgICAgIGNoYXJzZXQ6IChhdFJ1bGUpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChhdFJ1bGUubmFtZSA9PT0gJ2NoYXJzZXQnKSB7XHJcbiAgICAgICAgICAgICAgICAgIGF0UnVsZS5yZW1vdmUoKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICB9LFxyXG4gICAgICAgIF0sXHJcbiAgICAgIH0sXHJcbiAgICB9LFxyXG4gICAgLy8gXHU2REZCXHU1MkEwXHU5NzU5XHU2MDAxXHU4RDQ0XHU2RTkwXHU1OTA0XHU3NDA2XHJcbiAgICBwdWJsaWNEaXI6ICdwdWJsaWMnLFxyXG4gICAgYXNzZXRzSW5jbHVkZTogWycqKi8qLmpwZycsICcqKi8qLnBuZycsICcqKi8qLnN2ZycsICcqKi8qLmpzb24nXSxcclxuICAgIGJ1aWxkOiB7XHJcbiAgICAgIG91dERpcjogJ2Rpc3QnLFxyXG4gICAgICBhc3NldHNEaXI6ICdhc3NldHMnLFxyXG4gICAgICByb2xsdXBPcHRpb25zOiB7XHJcbiAgICAgICAgaW5wdXQ6IHtcclxuICAgICAgICAgIG1haW46IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsICdpbmRleC5odG1sJylcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn0pXHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTpcXFxcQ29kZVByb2plY3RcXFxcVG9rZW4tT2ZmaWNpYWwtV2ViXFxcXHZpdGVcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcQ29kZVByb2plY3RcXFxcVG9rZW4tT2ZmaWNpYWwtV2ViXFxcXHZpdGVcXFxccGx1Z2luc1xcXFxpbmRleC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovQ29kZVByb2plY3QvVG9rZW4tT2ZmaWNpYWwtV2ViL3ZpdGUvcGx1Z2lucy9pbmRleC50c1wiO2ltcG9ydCB2dWUgZnJvbSAnQHZpdGVqcy9wbHVnaW4tdnVlJ1xyXG5cclxuaW1wb3J0IGNyZWF0ZUF1dG9JbXBvcnQgZnJvbSAnLi9hdXRvLWltcG9ydCdcclxuaW1wb3J0IGNyZWF0ZVN2Z0ljb24gZnJvbSAnLi9zdmctaWNvbidcclxuaW1wb3J0IGNyZWF0ZUNvbXByZXNzaW9uIGZyb20gJy4vY29tcHJlc3Npb24nXHJcbmltcG9ydCBjcmVhdGVTZXR1cEV4dGVuZCBmcm9tICcuL3NldHVwLWV4dGVuZCdcclxuaW1wb3J0IHR5cGUgeyBQbHVnaW5PcHRpb24gfSBmcm9tICd2aXRlJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlVml0ZVBsdWdpbnModml0ZUVudjogUmVjb3JkPHN0cmluZywgc3RyaW5nPiwgaXNCdWlsZCA9IGZhbHNlKSB7XHJcbiAgY29uc3Qgdml0ZVBsdWdpbnMgPSA8QXJyYXk8UGx1Z2luT3B0aW9uPj5bdnVlKCldXHJcbiAgdml0ZVBsdWdpbnMucHVzaChjcmVhdGVBdXRvSW1wb3J0KCkpXHJcbiAgdml0ZVBsdWdpbnMucHVzaChjcmVhdGVTZXR1cEV4dGVuZCgpKVxyXG4gIHZpdGVQbHVnaW5zLnB1c2goY3JlYXRlU3ZnSWNvbihpc0J1aWxkKSlcclxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXVudXNlZC1leHByZXNzaW9uc1xyXG4gIGlzQnVpbGQgJiYgdml0ZVBsdWdpbnMucHVzaCguLi5jcmVhdGVDb21wcmVzc2lvbih2aXRlRW52KSlcclxuICByZXR1cm4gdml0ZVBsdWdpbnNcclxufVxyXG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIkU6XFxcXENvZGVQcm9qZWN0XFxcXFRva2VuLU9mZmljaWFsLVdlYlxcXFx2aXRlXFxcXHBsdWdpbnNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkU6XFxcXENvZGVQcm9qZWN0XFxcXFRva2VuLU9mZmljaWFsLVdlYlxcXFx2aXRlXFxcXHBsdWdpbnNcXFxcYXV0by1pbXBvcnQudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L0NvZGVQcm9qZWN0L1Rva2VuLU9mZmljaWFsLVdlYi92aXRlL3BsdWdpbnMvYXV0by1pbXBvcnQudHNcIjtpbXBvcnQgYXV0b0ltcG9ydCBmcm9tICd1bnBsdWdpbi1hdXRvLWltcG9ydC92aXRlJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlQXV0b0ltcG9ydCgpIHtcclxuICAgIHJldHVybiBhdXRvSW1wb3J0KHtcclxuICAgICAgICBpbXBvcnRzOiBbXHJcbiAgICAgICAgICAgICd2dWUnLFxyXG4gICAgICAgICAgICAndnVlLXJvdXRlcicsXHJcbiAgICAgICAgICAgICdwaW5pYSdcclxuICAgICAgICBdLFxyXG4gICAgICAgIGR0czogZmFsc2VcclxuICAgIH0pXHJcbn1cclxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJFOlxcXFxDb2RlUHJvamVjdFxcXFxUb2tlbi1PZmZpY2lhbC1XZWJcXFxcdml0ZVxcXFxwbHVnaW5zXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJFOlxcXFxDb2RlUHJvamVjdFxcXFxUb2tlbi1PZmZpY2lhbC1XZWJcXFxcdml0ZVxcXFxwbHVnaW5zXFxcXHN2Zy1pY29uLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9FOi9Db2RlUHJvamVjdC9Ub2tlbi1PZmZpY2lhbC1XZWIvdml0ZS9wbHVnaW5zL3N2Zy1pY29uLnRzXCI7aW1wb3J0IHsgY3JlYXRlU3ZnSWNvbnNQbHVnaW4gfSBmcm9tICd2aXRlLXBsdWdpbi1zdmctaWNvbnMnXHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVTdmdJY29uKGlzQnVpbGQ6IGJvb2xlYW4pIHtcclxuICByZXR1cm4gY3JlYXRlU3ZnSWNvbnNQbHVnaW4oe1xyXG4gICAgaWNvbkRpcnM6IFtwYXRoLnJlc29sdmUocHJvY2Vzcy5jd2QoKSwgJ3NyYy9hc3NldHMvaWNvbnMvc3ZnJyldLFxyXG4gICAgc3ltYm9sSWQ6ICdpY29uLVtkaXJdLVtuYW1lXScsXHJcbiAgICBzdmdvT3B0aW9uczogaXNCdWlsZCxcclxuICB9KVxyXG59XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTpcXFxcQ29kZVByb2plY3RcXFxcVG9rZW4tT2ZmaWNpYWwtV2ViXFxcXHZpdGVcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcQ29kZVByb2plY3RcXFxcVG9rZW4tT2ZmaWNpYWwtV2ViXFxcXHZpdGVcXFxccGx1Z2luc1xcXFxjb21wcmVzc2lvbi50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vRTovQ29kZVByb2plY3QvVG9rZW4tT2ZmaWNpYWwtV2ViL3ZpdGUvcGx1Z2lucy9jb21wcmVzc2lvbi50c1wiO2ltcG9ydCBjb21wcmVzc2lvbiBmcm9tICd2aXRlLXBsdWdpbi1jb21wcmVzc2lvbidcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGNyZWF0ZUNvbXByZXNzaW9uKGVudjogUmVjb3JkPHN0cmluZywgc3RyaW5nPikge1xyXG4gIGNvbnN0IHsgVklURV9CVUlMRF9DT01QUkVTUyB9ID0gZW52XHJcbiAgY29uc3QgcGx1Z2luID0gW11cclxuICBpZiAoVklURV9CVUlMRF9DT01QUkVTUykge1xyXG4gICAgY29uc3QgY29tcHJlc3NMaXN0ID0gVklURV9CVUlMRF9DT01QUkVTUy5zcGxpdCgnLCcpXHJcbiAgICBpZiAoY29tcHJlc3NMaXN0LmluY2x1ZGVzKCdnemlwJykpIHtcclxuICAgICAgLy8gaHR0cDovL2RvYy5ydW95aS52aXAvcnVveWktdnVlL290aGVyL2ZhcS5odG1sI1x1NEY3Rlx1NzUyOGd6aXBcdTg5RTNcdTUzOEJcdTdGMjlcdTk3NTlcdTYwMDFcdTY1ODdcdTRFRjZcclxuICAgICAgcGx1Z2luLnB1c2goXHJcbiAgICAgICAgY29tcHJlc3Npb24oe1xyXG4gICAgICAgICAgZXh0OiAnLmd6JyxcclxuICAgICAgICAgIGRlbGV0ZU9yaWdpbkZpbGU6IGZhbHNlLFxyXG4gICAgICAgIH0pLFxyXG4gICAgICApXHJcbiAgICB9XHJcbiAgICBpZiAoY29tcHJlc3NMaXN0LmluY2x1ZGVzKCdicm90bGknKSkge1xyXG4gICAgICBwbHVnaW4ucHVzaChcclxuICAgICAgICBjb21wcmVzc2lvbih7XHJcbiAgICAgICAgICBleHQ6ICcuYnInLFxyXG4gICAgICAgICAgYWxnb3JpdGhtOiAnYnJvdGxpQ29tcHJlc3MnLFxyXG4gICAgICAgICAgZGVsZXRlT3JpZ2luRmlsZTogZmFsc2UsXHJcbiAgICAgICAgfSksXHJcbiAgICAgIClcclxuICAgIH1cclxuICB9XHJcbiAgcmV0dXJuIHBsdWdpblxyXG59XHJcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiRTpcXFxcQ29kZVByb2plY3RcXFxcVG9rZW4tT2ZmaWNpYWwtV2ViXFxcXHZpdGVcXFxccGx1Z2luc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiRTpcXFxcQ29kZVByb2plY3RcXFxcVG9rZW4tT2ZmaWNpYWwtV2ViXFxcXHZpdGVcXFxccGx1Z2luc1xcXFxzZXR1cC1leHRlbmQudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0U6L0NvZGVQcm9qZWN0L1Rva2VuLU9mZmljaWFsLVdlYi92aXRlL3BsdWdpbnMvc2V0dXAtZXh0ZW5kLnRzXCI7aW1wb3J0IHNldHVwRXh0ZW5kIGZyb20gJ3VucGx1Z2luLXZ1ZS1zZXR1cC1leHRlbmQtcGx1cy92aXRlJ1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gY3JlYXRlU2V0dXBFeHRlbmQoKSB7XHJcbiAgICByZXR1cm4gc2V0dXBFeHRlbmQoe30pXHJcbn1cclxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUEyUixTQUFTLGNBQWMsZUFBdUI7QUFDelUsT0FBT0EsV0FBVTs7O0FDRHlTLE9BQU8sU0FBUzs7O0FDQUosT0FBTyxnQkFBZ0I7QUFFOVUsU0FBUixtQkFBb0M7QUFDdkMsU0FBTyxXQUFXO0FBQUEsSUFDZCxTQUFTO0FBQUEsTUFDTDtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDSjtBQUFBLElBQ0EsS0FBSztBQUFBLEVBQ1QsQ0FBQztBQUNMOzs7QUNYZ1UsU0FBUyw0QkFBNEI7QUFDclcsT0FBTyxVQUFVO0FBRUYsU0FBUixjQUErQixTQUFrQjtBQUN0RCxTQUFPLHFCQUFxQjtBQUFBLElBQzFCLFVBQVUsQ0FBQyxLQUFLLFFBQVEsUUFBUSxJQUFJLEdBQUcsc0JBQXNCLENBQUM7QUFBQSxJQUM5RCxVQUFVO0FBQUEsSUFDVixhQUFhO0FBQUEsRUFDZixDQUFDO0FBQ0g7OztBQ1RzVSxPQUFPLGlCQUFpQjtBQUUvVSxTQUFSLGtCQUFtQyxLQUE2QjtBQUNyRSxRQUFNLEVBQUUsb0JBQW9CLElBQUk7QUFDaEMsUUFBTSxTQUFTLENBQUM7QUFDaEIsTUFBSSxxQkFBcUI7QUFDdkIsVUFBTSxlQUFlLG9CQUFvQixNQUFNLEdBQUc7QUFDbEQsUUFBSSxhQUFhLFNBQVMsTUFBTSxHQUFHO0FBRWpDLGFBQU87QUFBQSxRQUNMLFlBQVk7QUFBQSxVQUNWLEtBQUs7QUFBQSxVQUNMLGtCQUFrQjtBQUFBLFFBQ3BCLENBQUM7QUFBQSxNQUNIO0FBQUEsSUFDRjtBQUNBLFFBQUksYUFBYSxTQUFTLFFBQVEsR0FBRztBQUNuQyxhQUFPO0FBQUEsUUFDTCxZQUFZO0FBQUEsVUFDVixLQUFLO0FBQUEsVUFDTCxXQUFXO0FBQUEsVUFDWCxrQkFBa0I7QUFBQSxRQUNwQixDQUFDO0FBQUEsTUFDSDtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0EsU0FBTztBQUNUOzs7QUMzQndVLE9BQU8saUJBQWlCO0FBRWpWLFNBQVIsb0JBQXFDO0FBQ3hDLFNBQU8sWUFBWSxDQUFDLENBQUM7QUFDekI7OztBSkllLFNBQVIsa0JBQW1DLFNBQWlDLFVBQVUsT0FBTztBQUMxRixRQUFNLGNBQW1DLENBQUMsSUFBSSxDQUFDO0FBQy9DLGNBQVksS0FBSyxpQkFBaUIsQ0FBQztBQUNuQyxjQUFZLEtBQUssa0JBQWtCLENBQUM7QUFDcEMsY0FBWSxLQUFLLGNBQWMsT0FBTyxDQUFDO0FBRXZDLGFBQVcsWUFBWSxLQUFLLEdBQUcsa0JBQWtCLE9BQU8sQ0FBQztBQUN6RCxTQUFPO0FBQ1Q7OztBRGJBLE9BQU8sUUFBUTtBQUhmLElBQU0sbUNBQW1DO0FBTXpDLFNBQVMsaUJBQXlCO0FBQ2hDLFNBQU87QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLFNBQVM7QUFBQSxJQUNULE1BQU0sYUFBYTtBQUNqQixjQUFRLElBQUksZ0NBQWdDO0FBQzVDLFVBQUk7QUFFRixjQUFNLEdBQUcsVUFBVSxlQUFlO0FBRWxDLGNBQU0sR0FBRyxLQUFLLFlBQVksaUJBQWlCO0FBQUEsVUFDekMsUUFBUSxDQUFDLFFBQVE7QUFDZixrQkFBTSxTQUFTLElBQUksU0FBUyxPQUFPO0FBQ25DLGdCQUFJLFFBQVE7QUFDVixzQkFBUSxJQUFJLFlBQVksR0FBRztBQUFBLFlBQzdCO0FBQ0EsbUJBQU87QUFBQSxVQUNUO0FBQUEsVUFDQSxXQUFXO0FBQUEsUUFDYixDQUFDO0FBQ0QsZ0JBQVEsSUFBSSxpQ0FBaUM7QUFBQSxNQUMvQyxTQUFTLE9BQU87QUFDZCxnQkFBUSxNQUFNLDZCQUE2QixLQUFLO0FBQUEsTUFDbEQ7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGO0FBR0EsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxNQUFNLFFBQVEsTUFBTTtBQUNqRCxRQUFNLE1BQU0sUUFBUSxNQUFNLFFBQVEsSUFBSSxDQUFDO0FBQ3ZDLFFBQU0sRUFBRSxhQUFhLElBQUk7QUFDekIsU0FBTztBQUFBO0FBQUE7QUFBQTtBQUFBLElBSUwsTUFBTSxpQkFBaUIsZUFBZSxNQUFNO0FBQUEsSUFDNUMsU0FBUztBQUFBLE1BQ1AsR0FBRyxrQkFBa0IsS0FBSyxZQUFZLE9BQU87QUFBQSxNQUM3QyxlQUFlO0FBQUEsSUFDakI7QUFBQSxJQUNBLFNBQVM7QUFBQTtBQUFBLE1BRVAsT0FBTztBQUFBO0FBQUEsUUFFTCxLQUFLQyxNQUFLLFFBQVEsa0NBQVcsSUFBSTtBQUFBO0FBQUEsUUFFakMsS0FBS0EsTUFBSyxRQUFRLGtDQUFXLE9BQU87QUFBQSxRQUNwQyxTQUFTQSxNQUFLLFFBQVEsa0NBQVcsWUFBWTtBQUFBLE1BQy9DO0FBQUE7QUFBQSxNQUVBLFlBQVksQ0FBQyxRQUFRLE9BQU8sT0FBTyxRQUFRLFFBQVEsU0FBUyxNQUFNO0FBQUEsSUFDcEU7QUFBQTtBQUFBLElBRUEsUUFBUTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLFFBQ0wsVUFBVTtBQUFBLFVBQ1IsUUFBUTtBQUFBLFVBQ1IsY0FBYztBQUFBLFVBQ2QsUUFBUTtBQUFBLFFBQ1Y7QUFBQSxRQUNBLFFBQVE7QUFBQSxVQUNOLFFBQVE7QUFBQSxVQUNSLGNBQWM7QUFBQSxVQUNkLFFBQVE7QUFBQSxRQUNWO0FBQUE7QUFBQSxRQUVBLGFBQWE7QUFBQSxVQUNYLFFBQVE7QUFBQSxVQUNSLGNBQWM7QUFBQSxVQUNkLFNBQVMsQ0FBQ0EsVUFBU0E7QUFBQSxRQUNyQjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLElBQUk7QUFBQTtBQUFBLFFBRUYsT0FBTyxDQUFDLElBQUk7QUFBQSxNQUNkO0FBQUEsTUFDQSxNQUFNO0FBQUEsSUFDUjtBQUFBO0FBQUEsSUFFQSxLQUFLO0FBQUEsTUFDSCxTQUFTO0FBQUEsUUFDUCxTQUFTO0FBQUEsVUFDUDtBQUFBLFlBQ0UsZUFBZTtBQUFBLFlBQ2YsUUFBUTtBQUFBLGNBQ04sU0FBUyxDQUFDLFdBQVc7QUFDbkIsb0JBQUksT0FBTyxTQUFTLFdBQVc7QUFDN0IseUJBQU8sT0FBTztBQUFBLGdCQUNoQjtBQUFBLGNBQ0Y7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBO0FBQUEsSUFFQSxXQUFXO0FBQUEsSUFDWCxlQUFlLENBQUMsWUFBWSxZQUFZLFlBQVksV0FBVztBQUFBLElBQy9ELE9BQU87QUFBQSxNQUNMLFFBQVE7QUFBQSxNQUNSLFdBQVc7QUFBQSxNQUNYLGVBQWU7QUFBQSxRQUNiLE9BQU87QUFBQSxVQUNMLE1BQU1BLE1BQUssUUFBUSxrQ0FBVyxZQUFZO0FBQUEsUUFDNUM7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogWyJwYXRoIiwgInBhdGgiXQp9Cg==
