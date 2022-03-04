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