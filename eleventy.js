require('dotenv-flow').config();

const navigation = require("@11ty/eleventy-navigation");
const pluginTOC = require('eleventy-plugin-toc');
const markdownIt = require("markdown-it");
const markdownItAnchor = require("markdown-it-anchor");
const markdownItToc = require("markdown-it-table-of-contents");
const slugify = require("slugify");
// const config = require('./config.js');

module.exports = function (eleventyConfig) {

  // Eleventy plugins
  eleventyConfig.addPlugin(navigation);
  eleventyConfig.addPlugin(pluginTOC);

  function removeExtraText(s) {
		let newStr = String(s).replace(/New\ in\ v\d+\.\d+\.\d+/, "");
		newStr = newStr.replace(/Coming\ soon\ in\ v\d+\.\d+\.\d+/, "");
		newStr = newStr.replace(/⚠️/g, "");
		newStr = newStr.replace(/[?!]/g, "");
		newStr = newStr.replace(/<[^>]*>/g, "");
		return newStr;
	}

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
	});

  eleventyConfig.addCollection("sidebarNav", function(collection) {
		// filter out excludeFromSidebar options
		return collection.getAll()
			.filter(item => (item.data || {}).excludeFromSidebar !== true);
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
