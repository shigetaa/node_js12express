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