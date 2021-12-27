// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import whenAssignment from "./whenAssignment";
import whenBlock from "./whenBlock";
import whenMethod from "./whenMethod";
import whenVariableDeclarator from "./whenVariableDeclarator";

export default ({
	ancestors,
	findBlockOrIdentifiableParentInAncestors,
	functionExpression,
	parent,
}) =>
	whenAssignment(
		{ parent },
	)
	||
	whenMethod({
		ancestors,
		parent,
	})
	||
	whenVariableDeclarator({
		ancestors,
		findBlockOrIdentifiableParentInAncestors,
		parent,
	})
	||
	whenBlock({
		ancestors,
		findBlockOrIdentifiableParentInAncestors,
		functionExpression,
		parent,
	});