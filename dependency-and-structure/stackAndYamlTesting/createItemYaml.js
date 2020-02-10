// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

export default ({
	id,
	items = null,
	...restOfYamlItem
}) => (
	{
		id,
		...restOfYamlItem,
		...items && { items },
	}
);