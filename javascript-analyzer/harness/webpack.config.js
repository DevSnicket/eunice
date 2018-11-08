const { createWebpackConfiguration } = require("@devsnicket/eunice-test-harnesses");

module.exports =
	createWebpackConfiguration({
		contentFromFile:
			{
				file: `${__dirname}/example.js`,
				placeholder: "javascriptFromWebpack",
			},
		directory:
			`${__dirname}/output/`,
		indexFile:
			"./harness/index.js",
	});