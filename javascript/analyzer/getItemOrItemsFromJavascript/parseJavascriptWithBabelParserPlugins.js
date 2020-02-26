// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import { parse } from "@babel/parser";

export default ({
	babelParserPlugins,
	javascript,
}) =>
	parse(
		removeUnixShebangForNode(javascript),
		{
			plugins:
				[
					"estree",
					...babelParserPlugins || [],
				],
			sourceType:
				"module",
		},
	);

function removeUnixShebangForNode(
	javascript,
) {
	const shebang = "#!/usr/bin/env node";

	return (
		javascript.startsWith(shebang)
		?
		javascript.substring(
			Math.max(
				shebang.length,
				javascript.indexOf("\n"),
			),
		)
		:
		javascript
	);
}