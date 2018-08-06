module.exports =
	({
		childElementsContainer,
		createElement,
		font,
		namespaces,
		style,
		symbols,
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
								style: `${getSvgStyleForFont(font)}${style}`,
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
	return `text{font-family:${font.family};font-size:${font.size}px;text-anchor:middle}`;
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
				style
			)
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
			children
		)
	);
}