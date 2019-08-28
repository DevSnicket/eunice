// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Licensed under the MIT license. See LICENSE file in the repository root for full license information.

/* istanbul ignore file: test would be a mirror of implementation */
const
	orderItemsByIdentifier = require("./orderItemsByIdentifier"),
	orderItemsByIndexOfType = require("./orderItemsByIndexOfType");

module.exports =
	{
		orderItemsByIdentifier,
		orderItemsByIndexOfType,
	};