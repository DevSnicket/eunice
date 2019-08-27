// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const visitorKeys = require("./createVisitorKeys")();

module.exports =
	(node, visitors) =>
		withVisitors(visitors)
		.visit(node);

function withVisitors(
	visitors,
) {
	const ancestors = [];

	return { visit };

	function visit(
		node,
	) {
		ancestors.push(node);

		visitNodeValues();

		callVisitor();

		ancestors.pop();

		function visitNodeValues() {
			const keys =
				visitorKeys[node.type];

			if (keys)
				for (const key of keys)
					visitNodeValue(
						node[key],
					);
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

		function callVisitor() {
			const visitor = visitors[node.type];

			if (visitor)
				visitor(node, ancestors);
		}
	}
}