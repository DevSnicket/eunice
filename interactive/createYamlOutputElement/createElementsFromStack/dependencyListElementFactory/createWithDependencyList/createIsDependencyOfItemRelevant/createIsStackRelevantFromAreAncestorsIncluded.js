// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import { isInnerStack } from "@devsnicket/eunice-dependency-and-structure";

export default
areAncestorsIncluded => {
	return whenIncluded() || isSame;

	function whenIncluded() {
		return (
			areAncestorsIncluded
			&&
			isAncestorOrSame
		);
	}
};

function isAncestorOrSame({
	source,
	target,
}) {
	return (
		!isInnerStack({
			source,
			target,
		})
	);
}

function isSame({
	source,
	target,
}) {
	return source === target;
}