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