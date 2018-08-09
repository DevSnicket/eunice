module.exports =
	// x and y are attribute names in SVG
	/* eslint id-length: ["error", { "exceptions": ["x", "y"] }] */
	({
		attributes,
		className,
		createElement,
		elementName,
		elementsBelowText,
		fontSize,
		height,
		key,
		left,
		padding,
		text,
		top,
		width,
		withPrecision,
	}) => {
		return (
			createElement(
				"g",
				{
					...className && { className },
					key,
				},
				[
					createShape(),
					createText(),
					...elementsBelowText || [],
				]
			)
		);

		function createShape() {
			return (
				createElement(
					elementName,
					{
						...attributes,
						height,
						key: "shape",
						width,
						...left > 0 && { x: left },
						...top > 0 && { y: top },
					}
				)
			);
		}

		function createText() {
			return (
				createElement(
					"text",
					{
						key: "text",
						x: withPrecision(left + getTextLeftOffset()),
						y: withPrecision(top + getTextTopOffset()),
					},
					text
				)
			);
		}

		function getTextLeftOffset() {
			return (width - padding.right) / 2;
		}

		function getTextTopOffset() {
			return (
				padding.top
				+
				(fontSize * 0.36)
			);
		}
	};