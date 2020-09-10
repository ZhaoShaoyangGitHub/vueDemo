const PrerenderSPAPlugin = require("prerender-spa-plugin");
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const path = require("path");

function resolve(dir) {
  return path.join(__dirname, "./", dir);
}

// cdn预加载使用
const externals = {
  vue: "Vue",
  "vue-router": "VueRouter",
  vuex: "Vuex",
  axios: "axios",
  "element-ui": "ELEMENT",
  "js-cookie": "Cookies",
  nprogress: "NProgress",
};

const cdn = {
  // 开发环境
  dev: {
    css: [
      "https://unpkg.com/element-ui/lib/theme-chalk/index.css",
      "https://cdn.bootcss.com/nprogress/0.2.0/nprogress.min.css",
    ],
    js: [],
  },

  // 生产环境
  build: {
    css: [
      "https://unpkg.com/element-ui/lib/theme-chalk/index.css",
      "https://cdn.bootcss.com/nprogress/0.2.0/nprogress.min.css",
    ],
    js: [
      "https://cdn.jsdelivr.net/npm/vue@2.5.17/dist/vue.min.js",
      "https://cdn.jsdelivr.net/npm/vue-router@3.0.1/dist/vue-router.min.js",
      "https://cdn.jsdelivr.net/npm/vuex@3.0.1/dist/vuex.min.js",
      "https://cdn.jsdelivr.net/npm/axios@0.18.0/dist/axios.min.js",
      "https://unpkg.com/element-ui/lib/index.js",
      "https://cdn.bootcss.com/js-cookie/2.2.0/js.cookie.min.js",
      "https://cdn.bootcss.com/nprogress/0.2.0/nprogress.min.js",
    ],
  },
};

// 是否使用gzip
const productionGzip = true;
// 需要gzip压缩的文件后缀
const productionGzipExtensions = ["js", "css"];

module.exports = {
  chainWebpack: (config) => {
    //这里是对环境的配置，不同环境对应不同的BASE_API，以便axios的请求地址不同
    config.plugin("define").tap((args) => {
      const argv = process.argv;
      const mode = argv[argv.indexOf("--project-mode") + 1];
      args[0]["process.env"].MODE = `"${mode}"`;
      args[0][
        "process.env"
      ].BASE_API = `"http://ip-30-rongyue-swagger.coralcodes.com/"`;
      return args;
    });

    /**
     * 添加CDN参数到htmlWebpackPlugin配置中， 详见public/index.html 修改
     */

    config.plugin("html").tap((args) => {
      if (process.env.NODE_ENV === "production") {
        args[0].cdn = cdn.build;
      }
      if (process.env.NODE_ENV === "development") {
        args[0].cdn = cdn.dev;
      }
      return args;
    });

    // svg loader
    const svgRule = config.module.rule("svg"); //找到svg-loader
    svgRule.uses.clear(); //清除已有的loader,如果不这样做会添加在loader之后
    svgRule.exclude.add(/node-modules/); //正则匹配排查node_modules目录
    svgRule
      .test(/\.svg$/)
      .use("svg-sprite-loader")
      .loader("svg-sprite-loader")
      .options({
        symbolId: "icon-[name]",
      });

    //修改images loader 添加svg处理
    const imagesRule = config.module.rule("images");
    imagesRule.exclude.add(resolve("src/icons"));
    config.module.rule("images").test(/\.(png|jpe?g|gif|svg)(\?.*)?$/);
  },
  configureWebpack: (config) => {
    const myConfig = {};
    if (process.env.NODE_ENV === "production") {
      // 1. 生产环境npm包转CDN
      myConfig.externals = externals;
      myConfig.plugins = [];

      // 2. 构建时开启gzip，降低服务器压缩对CPU资源的占用，服务器也要相应开启gzip
      productionGzip &&
        myConfig.plugins.push(
          new CompressionWebpackPlugin({
            test: new RegExp(
              "\\.(" + productionGzipExtensions.join("|") + ")$"
            ),
            threshold: 8192,
            minRatio: 0.8,
          })
        );

      //seo预编译
      myConfig.plugins = [
        new PrerenderSPAPlugin({
          // Required - The path to the webpack-outputted app to prerender.
          staticDir: path.join(__dirname, "dist"),

          // Optional - The path your rendered app should be output to.
          // (Defaults to staticDir.)
          // outputDir: path.join(__dirname, "prerendered"),

          // Optional - The location of index.html
          indexPath: path.join(__dirname, "dist", "index.html"),
          // 对应自己的路由文件，比如a有参数，就需要写成 /a/param1。
          routes: ["/", "/about"],
          // 这个很重要，如果没有配置这段，也不会进行预编译
          renderer: new Renderer({
            inject: {
              foo: "bar",
            },
            headless: false,
            // 在 main.js 中 document.dispatchEvent(new Event('render-event'))，两者的事件名称要对应上。
            renderAfterDocumentEvent: "render-event",
          }),
        }),
      ];
    }
    if (process.env.NODE_ENV === "development") {
      /**
       * 关闭host check，方便使用ngrok之类的内网转发工具
       */
      myConfig.devServer = {
        disableHostCheck: true,
      };
    }
    return myConfig;
  },
  devServer: {
    proxy: {
      "/api": {
        target: "http://ip-30-rongyue-swagger.coralcodes.com/",
        ws: false, //如果要代理 websockets，配置这个参数
        secure: false, // 如果是https接口，需要配置这个参数
        changeOrigin: true, //是否跨域
        pathRewrite: {
          "^/api": "",
        },
      },
    },
  },
};
