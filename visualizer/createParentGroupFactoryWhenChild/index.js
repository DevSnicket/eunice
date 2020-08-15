// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import createOuterDependencyGroupFactory from "../createOuterDependencyGroupFactory";
import createParentGroupFactory from "./createParentGroupFactory";

export default ({
	arrows,
	childGroupFactory,
	createTextGroup,
	elementContainerFactory,
	font,
	stack,
}) => {
	return whenHasParent() || childGroupFactory;

	function whenHasParent() {
		return (
			stack.parent
			&&
			createOuterDependencyGroupFactory({
				arrows,
				createTextGroup,
				elementContainerFactory,
				font,
				item:
					stack.parent,
				itemGroupFactory:
					createParentAndStackGroupFactory(),
			})
		);

		function createParentAndStackGroupFactory() {
			return (
				createParentGroupFactory({
					childGroupFactory,
					createTextGroup,
					getTextWidth:
						font.measure,
					identifier:
						stack.parent.id,
				})
			);
		}
	}
};