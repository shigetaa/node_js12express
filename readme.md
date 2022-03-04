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
## ビューへのルーティング
Express.js のおかげで、ビューが見やすくなり、レンダリングも容易になるはずです。
ビューは下記の物を作成します。

| ファイル名           | 用途                                                     |
| :------------------- | :------------------------------------------------------- |
| views/_layout.pug    | アプリケーションの主なスタイリングとナビゲーションの基礎 |
| views/index.pug      | ホームページのコンテンツを生成                           |
| views/courses.pug    | コースコンテンツを表示                                   |
| views/contact.pug    | 連絡用フォームを表示                                     |
| views/thanks.pug     | 投稿完了時を表示                                         |
| views/errors/404.pug | ページが見つからない時のエラーメッセージを表示           |
| views/errors/500.pug | 内部エラー時のエラーメッセージを表示                     |

最初に、レンダリングエンジンの読み込みを`main.js`に宣言します。
`app.set("view engine", "pug");`

レイアウト用のビューを`views/_layout.pug`に記述します。
```pug
doctype html
html(lang="ja")
  head
    title= title
  body
    block contents
```

連絡用フォームのビューを`views/contact.pug`に記述します。
```pug
extends _layout.pug

block contents
  form(action="/contact", method="post")
    label(for="name") Name 
    input#name(type="text", name="name")
    label(for="email") Email
    input#email(type="email" name="email")
    input(type="submit", value="Submit")

```

投稿完了時のビューを`views/thanks.pug`に記述します。
```pug
extends _layout.pug

block contents
  h1 contact thanks

```

ホームページ用のビューを`views/index.pug`に記述します。
```pug
extends _layout.pug

block contents
  h1 Welcom to Express

```
## 動的コンテンツをビューに渡す
コースコンテンツに表示する、コースのリストは頻繁に変更するので、アプリケーションで表示するコースは、JavaScript オブジェクトの配列に代入してビューに渡して表示します。
`controllers/homeController.js`に記述します。
```javascript
exports.showIndex = (req, res) => {
	res.render("index");
}
exports.showCourses = (req, res) => {
	let courses = [
		{
			title: "Event Driven Cakes",
			cost: 50
		},
		{
			title: "Asynchronous Artichoke",
			cost: 25
		},
		{
			title: "Object Oriented Orange Juice",
			cost: 10
		}
	];
	res.render("course", { courses: courses });
}
exports.showSignUp = (req, res) => {
	res.render("contact");
}
exports.postedSignUpForm = (req, res) => {
	res.render("thanks");
}
```

コースコンテンツ用のビューを`views/course.pug`に記述します。
```pug
extends _layout.pug

block contents
  h1 Our Courses
  each course in courses
    h5 #{course.title}
    span #{course.cost}

```

## エラーを処理する


## 静的なビューを供給する