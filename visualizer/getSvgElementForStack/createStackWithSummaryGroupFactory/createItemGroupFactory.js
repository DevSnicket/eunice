/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const
	createGroupsCenteredHorizontally = require("./createGroupsCenteredHorizontally"),
	getIdentifierClassNameAndText = require("../getIdentifierClassNameAndText");

module.exports =
	({
		createTextGroup,
		dependencyGroupFactories,
		dependencySpacing,
		font,
		identifier,
	}) => {
		const { className, text } =
			getIdentifierClassNameAndText({
				baseClassName: "item",
				identifier,
			});

		const padding =
			{
				left: 10,
				top: 20,
			};

		const dependencySize =
			calculateDependencySize();

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
								createDependencyGroupsWhenRequired({
									center: left + (width / 2),
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

		function calculateDependencySize() {
			return (
				dependencyGroupFactories
				?
				dependencyGroupFactories.reduce(
					(
						size,
						dependencyGroupFactory,
					) => (
						{
							height:
								Math.max(
									size.height,
									dependencyGroupFactory.height,
								),
							width:
								size.width
								+
								(size.width && dependencySpacing)
								+
								dependencyGroupFactory.width,
						}
					),
					{ height: 0, width: 0 },
				)
				:
				{ height: 0, width: 0 }
			);
		}

		function calculateHeight() {
			return (
				dependencySize.height
				+
				(padding.top * 2)
			);
		}

		function calculateWidth() {
			return (
				Math.max(
					font.measure(text),
					dependencySize.width,
				)
				+
				(padding.left * 2)
			);
		}

		function createDependencyGroupsWhenRequired({
			center,
			top,
		}) {
			return (
				dependencyGroupFactories
				&&
				createGroupsCenteredHorizontally({
					center,
					groupFactories: dependencyGroupFactories,
					spacing: dependencySpacing,
					top,
				})
			);
		}
	};