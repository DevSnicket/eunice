/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

export default ({
	createElement,
	font,
	groupFactory,
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
			groupFactory
			&&
			{
				attributes:
					{
						height: withPrecision(groupFactory.height),
						width: withPrecision(groupFactory.width),
					},
				children:
					[
						createStyleElementInDefsElement({
							createElement,
							style: `${getSvgStyleForFont(font)}${style}`,
						}),
						...symbols,
						...groupFactory.createAtPosition({
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