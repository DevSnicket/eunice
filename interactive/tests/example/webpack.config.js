// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import createWebpackConfiguration from "../../createWebpackConfiguration";
import path from "path";

export default
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
					path.join(__dirname, ".yaml"),
			},
		title:
			"Renderer of example YAML",
	});