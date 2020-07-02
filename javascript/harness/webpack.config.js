// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import createWebpackConfiguration from "@devsnicket/eunice-interactive/createWebpackConfiguration";
import path from "path";

export default
(environment, { mode }) =>
	createWebpackConfiguration({
		codeEditorLanguages:
			[ "javascript" ],
		directory:
			path.join(__dirname, "output"),
		indexFilePath:
			path.join(__dirname, "harness.js"),
		javascriptSubstitutions:
			[ {
				escape: mode !== "production",
				pattern: "javascriptFromWebpack",
				replacementFilePath: `${__dirname}/example.js`,
			} ],
		title:
			"JavaScript & YAML",
	});