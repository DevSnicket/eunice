const getIdentifierClassNameAndText = require("./getIdentifierClassNameAndText");

module.exports =
	({
		createTextGroup,
		parent,
		summaryElementsContainer,
	}) => {
		const
			height = summaryElementsContainer.bottom + 10,
			width = summaryElementsContainer.right + 10;

		const { className, text } =
			getIdentifierClassNameAndText({
				baseClassName: "parent",
				identifier: parent,
			});

		return (
			{
				bottom:
					height,
				elements:
					[
						createTextGroup({
							attributes: null,
							className,
							elementName: "rect",
							elementsBelowText: summaryElementsContainer.elements,
							height,
							key: text,
							left: 0,
							padding: { left: 10, top: 20 },
							parent,
							text,
							top: 0,
							width,
						}),
					],
				right:
					width,
			}
		);
	};