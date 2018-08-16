const getIdentifierClassNameAndText = require("./getIdentifierClassNameAndText");

module.exports =
	({
		createTextGroup,
		getTextWidth,
		parent,
		summaryElementsContainer,
	}) => {
		const { className, text } =
			getIdentifierClassNameAndText({
				baseClassName: "parent",
				identifier: parent,
			});

		const padding = 10;

		const
			height =
				summaryElementsContainer.bottom + padding,
			width =
				Math.max(
					summaryElementsContainer.right,
					getTextWidth(text) + padding
				)
				+
				padding;

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