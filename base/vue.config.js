/* eslint-disable standard/computed-property-even-spacing */
const PrerenderSPAPlugin = require("prerender-spa-plugin");
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer;
const path = require("path");

function resolve(dir) {
  return path.join(__dirname, "./", dir);
}

module.exports = {
  chainWebpack: config => {
    //这里是对环境的配置，不同环境对应不同的BASE_API，以便axios的请求地址不同
    config.plugin("define").tap(args => {
      const argv = process.argv;
      const mode = argv[argv.indexOf("--project-mode") + 1];
      args[0]["process.env"].MODE = `"${mode}"`;
      args[0][
        "process.env"
      ].BASE_API = `"http://ip-30-rongyue-swagger.coralcodes.com/"`;
      console.log(args);
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
        symbolId: "icon-[name]"
      });

    //修改images loader 添加svg处理
    const imagesRule = config.module.rule("images");
    imagesRule.exclude.add(resolve("src/icons"));
    config.module.rule("images").test(/\.(png|jpe?g|gif|svg)(\?.*)?$/);
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV !== "production") return;
    return {
      plugins: [
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
              foo: "bar"
            },
            headless: false
            // 在 main.js 中 document.dispatchEvent(new Event('render-event'))，两者的事件名称要对应上。
            // renderAfterDocumentEvent: "render-event",
          })
        })
      ]
    };
  },
  devServer: {
    proxy: {
      "/api": {
        target: "http://ip-30-rongyue-swagger.coralcodes.com/",
        ws: false, //如果要代理 websockets，配置这个参数
        secure: false, // 如果是https接口，需要配置这个参数
        changeOrigin: true, //是否跨域
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
};
