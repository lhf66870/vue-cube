const Koa = require("koa");
const Router = require("koa-router");
const jwt = require("jsonwebtoken"); //签发令牌
const jwtAuth = require("koa-jwt"); // 令牌校验
const secret = "it's a secret";
const app = new Koa();
const router = new Router();
router.get("/api/login", async ctx => {
  const { userName, passWord } = ctx.query;
  console.log(userName, passWord);
  if (userName == "admin" && passWord == "888") {
    // 生成令牌
    const token = jwt.sign(
      {
        data: { name: "Rversion" }, // ! 用户信息数据 !!! 禁止敏感信息   载荷为 base64 编码 可逆转
        exp: Math.floor(Date.now() / 1000) + 60 * 60 // 过期时间
      },
      secret
    );
    ctx.body = { code: 1, token };
  } else {
    ctx.status = 401;
    ctx.body = { code: 0, message: "用户名或者密码错误" };
  }
});
router.get("/api/userinfo", jwtAuth({ secret }), async ctx => {
  ctx.body = { code: 1, data: { name: "Rversion", age: 18 } };
});
app.use(router.routes());
app.listen(3000);
