/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import createVisitorKeys from "./createVisitorKeys";

export default
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