// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import createGroupsCenteredHorizontally from "./createGroupsCenteredHorizontally";
import getIdentifierClassNameAndText from "../getIdentifierClassNameAndText";

export default ({
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
			whenHasDependencies()
			||
			{ height: 0, width: 0 }
		);

		function whenHasDependencies() {
			return (
				dependencyGroupFactories
				&&
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
			);
		}
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