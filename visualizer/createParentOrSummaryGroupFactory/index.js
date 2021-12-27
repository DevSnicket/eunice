// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import createParentGroupFactory from "./createParentGroupFactory";
import createSummaryGroupFactory from "./createSummaryGroupFactory";

export default ({
	createElement,
	createTextGroup,
	dependencyGroupFactories,
	font,
	stack,
	stackGroupFactory,
}) => {
	return (
		whenHasParent()
		||
		createSummaryGroupFactory({
			createInnerDependencyGroupFactory:
				dependencyGroupFactories.createInner,
			stack,
			stackGroupFactory,
		})
	);

	function whenHasParent() {
		return (
			stack.parent
			&&
			createParentGroupFactory({
				createElement,
				createTextGroup,
				dependencyGroupFactories,
				getTextWidth:
					font.measure,
				parent:
					stack.parent,
				stackGroupFactory,
			})
		);
	}
};