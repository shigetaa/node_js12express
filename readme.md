# Express.js でサイト作成

サイト作成するために、ターミナルで`npm init` によってアプリケーションの`package.json`を初期化します。
エンドポイントを`main.js`を設定します。

`package.jso`の`scripts`項目に**start**スクリプトをついあｋします。
アプリケーションを、`node main.js` の代わりに `npm start` で起動できるように、`"start": "node main.js"` をスクリプトのリストに追加します。

アプリケーションのWebフレームワークとなるExpress.js と テンプレートエンジン Pug と http-status-codes と MongoDBを使う為 body-parser をインストールします。

```bash
npm i express pug http-status-codes body-parser
```
以上の事を行うと以下の様な`package.json`が作成されます。

```json
{
  "name": "node_js12express",
  "description": "",
  "version": "1.0.0",
  "main": "main.js",
  "devDependencies": {},
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node main.js"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "body-parser": "^1.19.2",
    "express": "^4.17.3",
    "http-status-codes": "^2.2.0",
    "pug": "^3.0.2"
  }
}
```

アプリケーションのディレクトリ構造を準備します。
```bash
mkdir views
mkdir controllers
mkdir public
mkdir public/css
mkdir public/js
mkdir public/img
```

## メインアプリケーションの準備
メインアプリケーションの`main.js`を下記の様に記述します。

```javascript
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set("port", process.env.PORT || 3000);

app.get("/", (req, res) => {
	res.send("Welcom to Express");
});

app.listen(app.get("port"), () => {
	console.log("server start http://localhost:%d/", app.get("port"));
});
```

実際に、アプリケーションを実行してみます。
```bash
npm start
```
```bash
> node_js12express@1.0.0 start
> node main.js

server start http://localhost:3000/
```

これで、Webブラウザで `http://localhost:3000/`にアクセスすると **Welcom to Express** と表示されているでしょう。

## さらに経路を追加する
経路を処理する`./controllers/homeController.js`を以下の様に記述していきます。
```javascript
exports.showCourses = (req, res) => {
	res.render("course");
}
exports.showSignUp = (req, res) => {
	res.render("contact");
}
exports.postedSignUpForm = (req, res) => {
	res.render("thanks");
}
```
そして、`main.js`に読み込む処理を記述します。
```javascript
const express = require("express");
const app = express();
const homeController = require("./controllers/homeController");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set("port", process.env.PORT || 3000);

app.get("/", (req, res) => {
	res.send("Welcom to Express");
});
app.get("/courses", homeController.showCourses);
app.get("/contact", homeController.showSignUp);
app.post("/contact", homeController.postedSignUpForm);

app.listen(app.get("port"), () => {
	console.log("server start http://localhost:%d/", app.get("port"));
});
```