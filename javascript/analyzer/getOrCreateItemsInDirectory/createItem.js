// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

module.exports =
	({
		dependsUpon = null,
		identifier,
		items = null,
		...restOfItem
	}) => (
		{
			id: identifier,
			...restOfItem,
			...dependsUpon && { dependsUpon },
			...items && { items },
		}
	);