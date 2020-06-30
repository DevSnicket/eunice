// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Licensed under the MIT license. See LICENSE file in the repository root for full license information.

export default ({
	identifiersNotUsed,
	targetLevelOrStack,
}) => {
	if (identifiersNotUsed)
		throw new Error(`Neither the following items were specified ${formatIdentifiersNotUsed()}, nor was a single item level of "existing", in new the stack ${formatTargetLevelOrStack()}.`);

	function formatIdentifiersNotUsed() {
		return (
			identifiersNotUsed
			.map(identifier => `"${identifier}"`)
			.join(", ")
		);
	}

	function formatTargetLevelOrStack() {
		return (
			JSON.stringify(targetLevelOrStack)
			.replace(/\{|\[(?!\])|,/g, "$& ")
			.replace(/\}|(?<!\[)\]/g, " $&")
			.replace(/"([^"]*)":/g, "$1: ")
		);
	}
};