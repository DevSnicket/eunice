/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

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