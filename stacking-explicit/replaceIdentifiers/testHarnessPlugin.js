// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Licensed under the MIT license. See LICENSE file in the repository root for full license information.

const
	processorPlugins = require("@devsnicket/eunice-test-harnesses-processor-plugins"),
	replaceIdentifiers = require("./");

processorPlugins.plugIn({
	action: replaceIdentifiers,
	parameter: { name: "prefix" },
	text: "replace identifiers",
});