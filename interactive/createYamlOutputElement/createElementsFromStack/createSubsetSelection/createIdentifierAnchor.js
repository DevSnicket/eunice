// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

export default ({
	createElement,
	href,
	identifier,
}) => {
	return (
		identifier
		?
		createAnchor(
			{ text: identifier },
		)
		:
		createAnchor({
			style: { fontStyle: "italic" },
			text: "anonymous",
		})
	);

	function createAnchor({
		style = null,
		text,
	}) {
		return (
			createElement(
				"a",
				{
					href,
					style,
				},
				text,
			)
		);
	}
};