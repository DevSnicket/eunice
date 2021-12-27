// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

export default
cliArguments =>
	Object.keys(cliArguments)
	.reduce(
		(camelCased, key) => (
			{
				...camelCased,
				[formatKey(key)]: cliArguments[key],
			}
		),
		{},
	);

function formatKey(
	kebab,
) {
	return (
		kebab.replace(
			/-([a-z])/g,
			(match, character) => character.toUpperCase(),
		)
	);
}