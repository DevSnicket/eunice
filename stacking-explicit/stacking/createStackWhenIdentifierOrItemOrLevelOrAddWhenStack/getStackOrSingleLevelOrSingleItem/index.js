// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Licensed under the MIT license. See LICENSE file in the repository root for full license information.

export default
stack => {
	return whenSingleItemOrLevel() || stack;

	function whenSingleItemOrLevel() {
		const singleItemOrLevel = getWhenSingle(stack);

		return (
			singleItemOrLevel
			&&
			(getWhenSingle(singleItemOrLevel) || singleItemOrLevel)
		);
	}
};

function getWhenSingle(
	value,
) {
	return (
		Array.isArray(value)
		&&
		value.length === 1
		&&
		value[0]
	);
}