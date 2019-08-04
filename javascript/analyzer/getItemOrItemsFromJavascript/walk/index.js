/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

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
				if (Array.isArray(nodeValue))
					for (const childNode of nodeValue)
						visit(childNode);
				else
					visit(nodeValue);
		}

		function callVisitor() {
			const visitor = visitors[node.type];

			if (visitor)
				visitor(node, ancestors);
		}
	}
}