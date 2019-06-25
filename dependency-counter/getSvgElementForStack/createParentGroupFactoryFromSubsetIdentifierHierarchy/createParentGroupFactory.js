/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

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