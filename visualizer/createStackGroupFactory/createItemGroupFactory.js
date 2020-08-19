// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import getIdentifierClassNameAndText from "../getIdentifierClassNameAndText";

export default ({
	createTextGroup,
	font,
	identifier,
	innerDependencyGroupFactory,
}) => {
	const { className, text } =
		getIdentifierClassNameAndText(
			identifier,
		);

	const padding =
		{
			left: 10,
			top: 20,
		};

	const
		height = calculateHeight(),
		width = calculateWidth();

	return (
		{
			createAtPosition:
				({
					left,
					top,
				}) =>
					createTextGroup({
						attributes:
							null,
						className,
						elementName:
							"rect",
						elementsBelowText:
							innerDependencyGroupFactory.createAtPosition({
								left: left + (width / 2),
								top: top + 34,
							}),
						height,
						key:
							text,
						left,
						padding:
							{
								left: width / 2,
								top: padding.top,
							},
						text,
						top,
						width,
					}),
			height,
			width,
		}
	);

	function calculateHeight() {
		return (
			innerDependencyGroupFactory.height
			+
			(padding.top * 2)
		);
	}

	function calculateWidth() {
		return (
			Math.max(
				font.measure(text),
				innerDependencyGroupFactory.width,
			)
			+
			(padding.left * 2)
		);
	}
};