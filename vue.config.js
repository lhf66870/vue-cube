module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        "resolve url": true,
        import: []
      }
    }
  },
  pluginOptions: {
    "cube-ui": {
      postCompile: true,
      theme: false
    }
  },
  configureWebpack: {
    devServer: {
      // proxy: {
      //   "/api": {
      //     target: "http://127.0.0.1:3000",
      //     changOrigin: true
      //   }
      // }
      before(app) {
        // 用户登录
        app.get("/api/login", (req, res) => {
          const { userName, passWord } = req.query;
          if (userName === "admin" && passWord === "888") {
            res.json({ code: 0, token: "asdf-erty-wert-opiy" });
          } else {
            res.status(200).json({ code: 0, message: "用户名或者密码错误" });
          }
        });

        // mock接口，vue.config.js
        function auth(req, res, next) {
          if (req.headers.token) {
            // 已认证
            next();
          } else {
            res.sendStatus(401);
          }
        }
        // 用户信息
        // app.get("/api/userinfo", auth, function(req, res) {
        app.get("/api/userinfo", function(req, res) {
          res.json({ code: 1, data: { name: "Rversion", age: 18 } });
        });

        // 商品信息
        app.get("/api/goods", function(req, res) {
          res.json({
            code: 1,
            slide: [
              {
                id: 1,
                url: "http://www.didichuxing.com/",
                image:
                  "https://img.tuguaishou.com/ips_banner/33/6c/ad/336cad5d671ce99508c29d23a9d0e2cc840.png?auth_key=2191593600-0-0-c74cca0a95bfa86f6d6741a8f91fbc87"
              },
              {
                id: 2,
                url: "http://www.didichuxing.com/",
                image:
                  "https://img.tuguaishou.com/ips_banner/53/73/3c/53733cd6e368336f07f46755e971cab3618.png?auth_key=2191593600-0-0-241224dcee8eae058bfbe63c25e9c8f6"
              },
              {
                id: 3,
                url: "http://www.didichuxing.com/",
                image:
                  "https://img.tuguaishou.com/ips_banner/fd/38/02/fd3802a02c94f74b344baf13b2b1d51e145.jpeg?auth_key=2191593600-0-0-0d4d60923167f4465265dd4b9bfb6a9f"
              },
              {
                id: 4,
                url: "http://www.didichuxing.com/",
                image:
                  "https://img.tuguaishou.com/ips_banner/bb/02/8c/bb028c75991dea776e4293b1dca77301667.jpeg?auth_key=2191593600-0-0-26da4f6e03a1f5a1e82a5176ff235df7"
              }
            ],
            data: {
              new: [
                {
                  id: 1,
                  title: "侠客岛对话郑永年",
                  price: "48.80",
                  img: "http://img3m6.ddimg.cn/30/9/27872886-1_l_2.jpg",
                  count: 16
                },
                {
                  id: 2,
                  title: "汪曾祺散文精选集",
                  price: "29.70",
                  img: "http://img3m9.ddimg.cn/3/24/27856029-1_l_4.jpg",
                  count: 86
                },
                {
                  id: 3,
                  title: "虎妈战歌",
                  price: "52.20",
                  img: "http://img3m6.ddimg.cn/94/20/27853546-1_l_4.jpg",
                  count: 65
                },
                {
                  id: 4,
                  title: "最初之前",
                  price: "41.20",
                  img: "http://img3m7.ddimg.cn/18/12/27862677-1_l_28.jpg",
                  count: 120
                },
                {
                  id: 5,
                  title: "那爷爷讲国宝的故事",
                  price: "239.30",
                  img: "http://img3m1.ddimg.cn/14/32/27869801-1_l_2.jpg",
                  count: 98
                }
              ],
              hot: [
                {
                  id: 7,
                  title: "所谓命运，大多是我",
                  price: "88.90",
                  img: "http://img3m2.ddimg.cn/87/34/26914722-1_l_6.jpg",
                  count: 66
                },
                {
                  id: 8,
                  title: "性爱之技",
                  price: "99.99",
                  img: "http://img3m4.ddimg.cn/44/10/1901108924-1_l_2.jpg",
                  count: 999
                }
              ],
              doc: [
                {
                  id: 9,
                  title: "你不懂茶",
                  price: "88.90",
                  img: "http://img3m2.ddimg.cn/90/36/1901117682-1_l_3.jpg",
                  count: 112
                }
              ]
            },
            keys: ["new", "hot", "doc"]
          });
        });
      }
    }
  }
};
