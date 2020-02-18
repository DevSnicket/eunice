// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Licensed under the MIT license. See LICENSE file in the repository root for full license information.

import fs from "fs";
import getAncestorIdentifiersWhenValid from "./getAncestorIdentifiersWhenValid";
import { safeLoad as parseYaml } from "js-yaml";
import path from "path";

export default ({
	ancestors,
	directory,
	stackFileName = ".eunice-stack.yaml",
	subsetIdentifierHierarchy,
}) => {
	const ancestorIdentifiers =
		getAncestorIdentifiersWhenValid({
			ancestors,
			subsetIdentifierHierarchy,
		});

	return (
		ancestorIdentifiers
		&&
		getIdentifiersInNewStackFromPath(
			getStackFilePath(),
		)
	);

	function getStackFilePath() {
		return (
			path.join(
				directory,
				...ancestorIdentifiers,
				stackFileName,
			)
		);
	}
};

function getIdentifiersInNewStackFromPath(
	stackFilePath,
) {
	return (
		fs.existsSync(stackFilePath)
		&&
		readStack()
	);

	function readStack() {
		return (
			parseYaml(
				fs.readFileSync(
					stackFilePath,
					"utf-8",
				),
			)
		);
	}
}