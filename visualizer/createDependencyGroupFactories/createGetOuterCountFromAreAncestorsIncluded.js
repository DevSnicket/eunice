// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import { sumDirectionsAndRelationships } from "@devsnicket/eunice-dependency-counter";

export default areAncestorsIncluded => {
	return (
		whenAncestorsIncluded()
		||
		(({ parent }) => parent)
	);

	function whenAncestorsIncluded() {
		return (
			areAncestorsIncluded
			&&
			sumAncestorsAndParent
		);
	}
};

function sumAncestorsAndParent({
	ancestors,
	parent,
}) {
	return (
		sumDirectionsAndRelationships(
			ancestors,
			parent,
		)
	);
}