let data = {
	layout: "layouts/docs.njk",
	feedTitle: "DaScH Lab documentations"
};

if(process.env.NODE_ENV === "production") {
	data.date = "git Last Modified";
}

module.exports = data;