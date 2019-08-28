#!/usr/bin/env node
// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Licensed under the MIT license. See LICENSE file in the repository root for full license information.

const
	callWithProcessStandardStreamsOfYaml = require("../../callWithProcessStandardStreamsOfYaml"),
	createOrAddToStacksUsingFileSystem = require("./");

callWithProcessStandardStreamsOfYaml(
	({
		directory,
		items,
		subsetIdentifierHierarchy,
	}) =>
		createOrAddToStacksUsingFileSystem({
			directory,
			items,
			subsetIdentifierHierarchy:
				typeof subsetIdentifierHierarchy === "string"
				?
				[ subsetIdentifierHierarchy ]
				:
				subsetIdentifierHierarchy,
		}),
);