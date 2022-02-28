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
