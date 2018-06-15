module.exports =
	({
		childElementsContainer,
		createElement,
		font,
		symbols,
	}) => {
		return (
			createFromAttributesAndChildren({
				...createAttributesWithChildren(),
				createElement,
			}));

		function createAttributesWithChildren() {
			return (
				childElementsContainer
				&&
				{
					attributes:
						{
							height: childElementsContainer.bottom,
							width: childElementsContainer.right,
						},
					children:
						[
							createStyleElementInDefsElement({
								createElement,
								style: getSvgStyleForFont(font),
							}),
							...symbols,
							...childElementsContainer.elements,
						],
				});
		}
	};

function getSvgStyleForFont(
	font
) {
	return (
		[
			`text{font-family:${font.family};font-size:${font.size}px;text-anchor:middle}`,
			"g.dependency text{fill:white}",
			"g.item rect{fill:lightgray}",
			"g.item text{fill:black}",
		]
		.join(""));
}

function createStyleElementInDefsElement({
	createElement,
	style,
}) {
	return (
		createElement(
			"defs",
			null,
			createElement(
				"style",
				{ type: "text/css" },
				style
			)
		));
}

function createFromAttributesAndChildren({
	attributes,
	children,
	createElement,
}) {
	return (
		createElement(
			"svg",
			{
				...attributes,
				xmlns: "http://www.w3.org/2000/svg",
			},
			children
		));
}