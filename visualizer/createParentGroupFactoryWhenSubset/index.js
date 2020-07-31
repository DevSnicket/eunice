// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import createDependencyGroupFactoryWhenRequired from "../createDependencyGroupFactoryWhenRequired";
import createOuterDependencyGroupFactory from "../createOuterDependencyGroupFactory";
import createParentGroupFactory from "./createParentGroupFactory";

export default ({
	arrows,
	createGroupFactoryForStack,
	createTextGroup,
	font,
	stack,
}) => {
	return (
		stack.parent
		&&
		createOuterDependencyGroupFactory({
			arrows,
			createGroupFactoryWhenRequired:
				createParentOuterDependencyGroupFactoryWhenRequired,
			dependencyCount:
				stack.parent.dependencyCount,
			itemGroupFactory:
				createParentAndStackGroupFactory(),
		})
	);

	function createParentOuterDependencyGroupFactoryWhenRequired({
		arrow,
		count,
		keys,
	}) {
		return (
			createDependencyGroupFactoryWhenRequired({
				arrow,
				count,
				createTextGroup,
				font,
				key:
					`${stack.parent.id} dependency count outer ${keys.relationship} ${keys.structure}`,
			})
		);
	}

	function createParentAndStackGroupFactory() {
		return (
			createParentGroupFactory({
				childGroupFactory:
					createGroupFactoryForStack(
						stack,
					),
				createTextGroup,
				getTextWidth:
					font.measure,
				identifier:
					stack.parent.id,
			})
		);
	}
};