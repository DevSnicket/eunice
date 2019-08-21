/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

require("array.prototype.flatmap")
.shim();

module.exports = getNamesFromDestructureOrIdentifier;

function getNamesFromDestructureOrIdentifier({
	argument,
	elements,
	left,
	name,
	properties,
	type,
}) {
	return (
		whenArray()
		||
		whenAssignment()
		||
		whenObject()
		||
		getNamesWhenRest({
			argument,
			type,
		})
		||
		[ name ]
	);

	function whenArray() {
		return (
			type === "ArrayPattern"
			&&
			elements.flatMap(
				element =>
					element ? element.name : [],
			)
		);
	}

	function whenAssignment() {
		return (
			type === "AssignmentPattern"
			&&
			getNamesFromDestructureOrIdentifier(left)
		);
	}

	function whenObject() {
		return (
			type === "ObjectPattern"
			&&
			properties.flatMap(getNamesFromProperty)
		);
	}
}

function getNamesFromProperty(
	property,
) {
	return (
		getNamesWhenRest(property)
		||
		getNamesFromDestructureOrIdentifier(property.value)
	);
}

function getNamesWhenRest({
	argument,
	type,
}) {
	return (
		type === "RestElement"
		&&
		[ argument.name ]
	);
}