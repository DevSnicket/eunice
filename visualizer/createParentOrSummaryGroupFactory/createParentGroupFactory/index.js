// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import calculateSize from "./calculateSize";
import createMultipleItemInnerDependencyGroupFactory from "./createMultipleItemInnerDependencyGroupFactory";
import createParentGroup from "./createParentGroup";
import getIdentifierClassNameAndText from "../../getIdentifierClassNameAndText";
import withPrecision from "../../withPrecision";

export default ({
	createElement,
	createTextGroup,
	dependencyGroupFactories,
	getTextWidth,
	parent,
	stackGroupFactory,
}) =>
	dependencyGroupFactories.createOuterFromItem({
		contentGroupFactory:
			createParentGroupFactoryWithSize({
				createElement,
				createTextGroup,
				getTextWidth,
				identifier:
					{
						height:
							40,
						...getIdentifierClassNameAndText(
							parent.id,
						),
					},
				innerDependencyGroupFactory:
					createMultipleItemInnerDependencyGroupFactory({
						createInnerDependencyGroupFactoryFromItem:
							dependencyGroupFactories.createInnerFromItem,
						parent,
					}),
				stackGroupFactory,
			}),
		item:
			parent,
	});

function createParentGroupFactoryWithSize({
	createElement,
	createTextGroup,
	getTextWidth,
	identifier,
	innerDependencyGroupFactory,
	stackGroupFactory,
}) {
	const { height, width } =
		calculateSize({
			getTextWidth,
			identifier,
			innerDependencyGroupFactory,
			stackGroupFactory,
		});

	return {
		createAtPosition:
			({ top, left }) =>
				createParentGroup({
					createElement,
					createTextGroup,
					height,
					identifier,
					innerDependencyGroupFactory,
					left:
						withPrecision(left),
					stackGroupFactory,
					top,
					width,
				}),
		height,
		width,
	};
}