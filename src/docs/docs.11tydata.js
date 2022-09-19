let data = {
	layout: "layouts/docs.njk",
	feedTitle: "DaScH Lab documentations"
};

if(process.env.NODE_ENV === "production") {
	data.date = "git Last Modified";
}

// module.exports = data;

module.exports = {
	layout: "layouts/docs.njk",
	feedTitle: "DaScH Lab documentations",
	date: 'Last Modified',
	eleventyComputed: {
		// public: function(data) {
		// 	console.log(data);
		// 	return data.data.public || false;
		// },
		public: (data) => {
			return data.public || false;
		},
		permalink: (data) => {
			// if(!data){
			// 	return '';
			// }
			if(data.permalink){
				return data.permalink;
			}
			// let isPublic = data.public || false;
			let permalink = data.page.filePathStem + '/';
			// return `/_${data.permalink}/`;
			// let isPublic = data.data.public || false;
			return data.public ? permalink : permalink.replace('docs', '_pending');
		}
	}
}