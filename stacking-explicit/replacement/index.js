// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Licensed under the MIT license. See LICENSE file in the repository root for full license information.

/* istanbul ignore file: test would be a mirror of implementation */
const
	replaceDependsUpon = require("./replaceDependsUpon"),
	replaceIdentifiersAndItems = require("./replaceIdentifiersAndItems"),
	replaceIdentifiersAndItemsAndLevelsAndStacks = require("./replaceIdentifiersAndItemsAndLevelsAndStacks");

module.exports =
	{
		replaceDependsUpon,
		replaceIdentifiersAndItems,
		replaceIdentifiersAndItemsAndLevelsAndStacks,
	};