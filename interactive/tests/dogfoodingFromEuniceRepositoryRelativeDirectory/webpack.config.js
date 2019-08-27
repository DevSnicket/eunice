// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	createWebpackConfiguration = require("../../createWebpackConfiguration"),
	path = require("path");

module.exports =
	(environment, { mode }) =>
		createWebpackConfiguration({
			directory:
				path.join(__dirname, "output"),
			javascriptSubstitution:
				{
					escape:
						mode !== "production",
					pattern:
						new RegExp("(?<=yaml:|yaml: )yamlFromWebpack"),
					replacementFilePath:
						path.join("..", "eunice-javascript", "dogfooding", "output", "index.yaml"),
				},
		});