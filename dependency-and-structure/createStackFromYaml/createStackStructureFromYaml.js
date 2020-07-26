// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

export default createStackFromParsedYaml;

function createStackFromParsedYaml(
	yaml,
) {
	return (
		whenLevelOrStack()
		||
		[ createLevelFromIdentifierOrItem(yaml) ]
	);

	function whenLevelOrStack() {
		return (
			Array.isArray(yaml)
			&&
			createFromLevelOrStack()
		);

		function createFromLevelOrStack() {
			return (
				whenStack()
				||
				[ createLevelFromIdentifierOrItemOrLevel(yaml) ]
			);

			function whenStack() {
				return (
					yaml.some(Array.isArray)
					&&
					yaml
					.filter(itemOrLevel => itemOrLevel)
					.map(createLevelFromIdentifierOrItemOrLevel)
				);
			}
		}
	}
}

function createLevelFromIdentifierOrItemOrLevel(
	identifierOrItemOrLevel,
) {
	return (
		whenLevel()
		||
		createLevelFromIdentifierOrItem(identifierOrItemOrLevel)
	);

	function whenLevel() {
		return (
			Array.isArray(identifierOrItemOrLevel)
			&&
			identifierOrItemOrLevel.map(createItemFromItemOrIdentifier)
		);
	}
}

function createItemFromItemOrIdentifier(
	identifierOrItem,
) {
	return (
		whenIdentifier()
		||
		createItemFromItem(identifierOrItem)
	);

	function whenIdentifier() {
		return (
			isString(identifierOrItem)
			&&
			{ id: identifierOrItem }
		);
	}
}

function createLevelFromIdentifierOrItem(
	identifierOrItem,
) {
	return [
		whenString()
		||
		createItemFromItem(identifierOrItem),
	];

	function whenString() {
		return (
			isString(identifierOrItem)
			&&
			{ id: identifierOrItem }
		);
	}
}
function isString(
	value,
) {
	return typeof value === "string";
}

function createItemFromItem({
	dependsUpon,
	id,
	items,
	...restOfObject
}) {
	return {
		...id && { id },
		...dependsUpon && { dependsUpon: ensureIsArray(dependsUpon) },
		...restOfObject,
		...items && { items: createStackFromParsedYaml(items) },
	};
}

function ensureIsArray(
	item,
) {
	return (
		whenArray()
		||
		[ item ]
	);

	function whenArray() {
		return (
			Array.isArray(item)
			&&
			item
		);
	}
}