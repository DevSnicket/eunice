// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const createVisitorKeys = require("./createVisitorKeys");

module.exports =
	({
		node,
		visitors,
	}) =>
		withVisitorKeysAndVisitors({
			visitorKeys: createVisitorKeys(),
			visitors,
		})
		.visit(
			node,
		);

function withVisitorKeysAndVisitors({
	visitorKeys,
	visitors,
}) {
	const ancestors = [];

	return { visit };

	function visit(
		node,
	) {
		ancestors.push(node);

		visitNodeValuesWithVisitorKeys(
			visitorKeys[node.type],
		);

		callVisitor();

		ancestors.pop();

		function visitNodeValuesWithVisitorKeys(
			keys,
		) {
			if (keys)
				for (const key of keys)
					visitNodeValue(
						node[key],
					);
		}

		function callVisitor() {
			const visitor = visitors[node.type];

			if (visitor)
				visitor(node, ancestors);
		}
	}

	function visitNodeValue(
		nodeValue,
	) {
		if (nodeValue)
			if (Array.isArray(nodeValue)) {
				for (const childNode of nodeValue)
					if (childNode)
						visit(childNode);
			} else
				visit(nodeValue);
	}
}