// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Licensed under the MIT license. See LICENSE file in the repository root for full license information.

const
	processorPlugins = require("@devsnicket/eunice-test-harnesses-processor-plugins"),
	removeRedundantParentIdentifierPrefix = require("./");

processorPlugins.plugIn({
	action: removeRedundantParentIdentifierPrefix,
	parameter: { name: "identifierSeparator" },
	text: "remove redundant identifier prefix of parent and separator",
});