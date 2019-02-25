const getIdentifierClassNameAndText = require("../getIdentifierClassNameAndText");

module.exports =
	({
		childGroupFactory,
		createTextGroup,
		getTextWidth,
		identifier,
	}) => {
		const padding = 10;

		const { className, text } =
			getIdentifierClassNameAndText({
				baseClassName: "parent",
				identifier,
			});

		const childTopOffset = 40;

		const
			height =
				childGroupFactory.height + childTopOffset + padding,
			width =
				Math.max(
					childGroupFactory.width,
					getTextWidth(text),
				)
				+
				(padding * 2);

		return (
			{
				createAtPosition,
				height,
				width,
			}
		);

		function createAtPosition({
			left,
			top,
		}) {
			return (
				[
					createTextGroup({
						attributes:
							null,
						className,
						elementName:
							"rect",
						elementsBelowText:
							childGroupFactory.createAtPosition({
								left: left + padding,
								top: top + childTopOffset,
							}),
						height,
						key:
							text,
						left,
						padding:
							createPadding(),
						text,
						top,
						width,
					}),
				]
			);
		}

		function createPadding() {
			return (
				{
					left: padding,
					top: padding * 2,
				}
			);
		}
	};