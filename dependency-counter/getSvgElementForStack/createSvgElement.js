// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

module.exports =
	({
		childGroupFactory,
		createElement,
		font,
		namespaces,
		style,
		symbols,
		withPrecision,
	}) => {
		return (
			createFromAttributesAndChildren({
				...createAttributesWithChildren(),
				createElement,
				namespaces,
			})
		);

		function createAttributesWithChildren() {
			return (
				childGroupFactory
				&&
				{
					attributes:
						{
							height: withPrecision(childGroupFactory.height),
							width: withPrecision(childGroupFactory.width),
						},
					children:
						[
							createStyleElementInDefsElement({
								createElement,
								style: `${getSvgStyleForFont(font)}${style}`,
							}),
							...symbols,
							...childGroupFactory.createAtPosition({
								left: 0,
								top: 0,
							}),
						],
				});
		}
	};

function getSvgStyleForFont(
	font,
) {
	return `text{font-family:${font.family};font-size:${font.size}px}`;
}

function createStyleElementInDefsElement({
	createElement,
	style,
}) {
	return (
		createElement(
			"defs",
			{ key: "definition" },
			createElement(
				"style",
				{ type: "text/css" },
				style,
			),
		)
	);
}

function createFromAttributesAndChildren({
	attributes,
	children,
	createElement,
	namespaces,
}) {
	return (
		createElement(
			"svg",
			{
				...attributes,
				xmlns: "http://www.w3.org/2000/svg",
				...namespaces,
			},
			children,
		)
	);
}