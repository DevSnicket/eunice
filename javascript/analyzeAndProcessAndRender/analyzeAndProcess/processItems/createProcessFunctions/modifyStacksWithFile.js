// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import {
	createOrAddToStacksOfParentMatch,
	createStackWhenIdentifierOrItemOrLevelOrAddWhenStack,
} from "@devsnicket/eunice-processors/stacking";

import { safeLoad as parseYaml } from "js-yaml";
import { readFileSync } from "fs";
import { replaceIdentifiersAndItemsAndLevelsAndStacks } from "@devsnicket/eunice-processors/replacement";

export default ({
	filePath,
	identifierOrItemOrLevelOrStack,
	key,
	pattern,
}) => {
	return whenSpecified() || identifierOrItemOrLevelOrStack;

	function whenSpecified() {
		return (
			filePath
			&&
			withTargetLevelOrStack(
				readTargetYaml(),
			)
			.modifyStacks({
				identifierOrItemOrLevelOrStack,
				key,
				pattern,
			})
		);
	}

	function readTargetYaml() {
		return (
			parseYaml(
				readFileSync(
					filePath,
					"utf-8",
				),
			)
		);
	}
};

function withTargetLevelOrStack(
	targetLevelOrStack,
) {
	const addNewInTarget = false;

	return { modifyStacks };

	function modifyStacks({
		identifierOrItemOrLevelOrStack,
		key,
		pattern,
	}) {
		return whenHasKeyAndPattern() || uniformly();

		function whenHasKeyAndPattern() {
			return (
				key && pattern
				&&
				createOrAddToStacksOfParentMatch({
					addNewInTarget,
					identifierOrItemOrLevelOrStack,
					keysAndPatterns:
						[ {
							key,
							pattern,
						} ],
					targetLevelOrStack,
				})
			);
		}

		function uniformly() {
			return (
				replaceIdentifiersAndItemsAndLevelsAndStacks({
					identifierOrItemOrLevelOrStack,
					replace: modifyStack,
				})
			);
		}
	}

	function modifyStack(
		{ identifierOrItemOrLevelOrStack },
	) {
		return (
			createStackWhenIdentifierOrItemOrLevelOrAddWhenStack({
				addNewInTarget,
				identifierOrItemOrLevelOrStack,
				targetLevelOrStack,
			})
		);
	}
}