/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

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