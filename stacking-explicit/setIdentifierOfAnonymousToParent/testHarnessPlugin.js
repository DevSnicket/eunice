// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Licensed under the MIT license. See LICENSE file in the repository root for full license information.

const
	processorPlugins = require("@devsnicket/eunice-test-harnesses-processor-plugins"),
	setIdentifierOfAnonymousToParent = require("./");

processorPlugins.plugIn({
	action: setIdentifierOfAnonymousToParent,
	text: "set identifier of anonymous to parent",
});