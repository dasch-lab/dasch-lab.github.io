require('dotenv-flow').config();

const date = require('./eleventy/date');
const navigation = require("@11ty/eleventy-navigation");
const pluginTOC = require('eleventy-plugin-toc');
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItToc = require("markdown-it-table-of-contents");
const slugify = require("slugify");
const htmlmin = require('html-minifier');
const config = require('./config.js');

module.exports = function (eleventyConfig) {

  // Eleventy filters
  eleventyConfig.addFilter('date', date.date);
  
  // Eleventy plugins
  eleventyConfig.addPlugin(navigation);
  eleventyConfig.addPlugin(pluginTOC, {
	wrapper: 'div',
	tags: ['h2', 'h3'], //things to include in the toc on the left
	ul: true
  });

  function removeExtraText(s) {
		let newStr = String(s).replace(/New\ in\ v\d+\.\d+\.\d+/, "");
		newStr = newStr.replace(/Coming\ soon\ in\ v\d+\.\d+\.\d+/, "");
		newStr = newStr.replace(/⚠️/g, "");
		newStr = newStr.replace(/[?!]/g, "");
		newStr = newStr.replace(/<[^>]*>/g, "");
		return newStr;
	}

  // Html minimiser
  eleventyConfig.addTransform("htmlmin", function(content, outputPath) {

    if(!outputPath.endsWith(".html") || !config.isProd)
      return content;

    return htmlmin.minify(content, {
      useShortDoctype: true,
      removeComments: true,
      minifyJS: true,
      minifyCSS: true,
      processScripts: false,
      collapseWhitespace: true
    });
  });

  // Markdown support
  function markdownItSlugify(s) {
		return slugify(removeExtraText(s), { lower: true, remove: /[:’'`,]/g });
	}

  let mdIt = markdownIt({
		html: true,
		breaks: true,
		linkify: true
	})
	.disable('code') // disable indent -> code block
	.use(markdownItAnchor, {
		slugify: markdownItSlugify,
		level: [1,2,3,4]
		// permalink: markdownItAnchor.permalink.linkInsideHeader({
		// 	symbol: `
		// 		<span class="sr-only">Jump to heading</span>
		// 		<span aria-hidden="true">#</span>
		// 	`,
		// 	class: "direct-link",
		// 	placement: 'after'
		// })
	})
	.use(markdownItToc, {
		includeLevel: [2, 3],
		slugify: markdownItSlugify,
		format: function(heading) {
			return removeExtraText(heading);
		},
		transformLink: function(link) {
			// remove backticks from markdown code
			return link.replace(/\%60/g, "");
		}
	});

  mdIt.linkify.tlds('.io', false);
	eleventyConfig.setLibrary("md", mdIt);

	eleventyConfig.addPairedShortcode("markdown", function(content) {
		return mdIt.renderInline(content);
	});
	eleventyConfig.addFilter("markdown", function(content) {
		return mdIt.renderInline(content);
	});

  eleventyConfig.addCollection("docsFeed", function(collection) {
		return collection.getFilteredByGlob("src/docs/**/*.md").sort((a, b) => {
			return b.date - a.date; // sort by date - descending
		});
		// .map(item => {
		// 	// Check if the document is public. Fallback to false
		// 	let isPublished = item.data.public || false;
		// 	if(!isPublished){

		// 	}
		// 	console.log(isPublished);
		// });
	});

  eleventyConfig.addCollection("sidebarNav", function(collection) {
		// filter out excludeFromSidebar options
		return collection.getAll()
			.filter(item => (item.data || {}).excludeFromSidebar !== true)
			.filter(item => (item.data || {}).public !== false);
	});

  return {
    dir: {
      input: 'src',
      output: 'build',
      includes: '_includes',
      data: '_data'
    },
    templateFormats: ["html", "njk", "md", "11ty.js"],
		markdownTemplateEngine: "njk",
		htmlTemplateEngine: "njk",
    dataTemplateEngine: false,
    // templateFormats: [ 'njk' ],
    // passthroughFileCopy: true,
    pathPrefix: ""
  };
};
