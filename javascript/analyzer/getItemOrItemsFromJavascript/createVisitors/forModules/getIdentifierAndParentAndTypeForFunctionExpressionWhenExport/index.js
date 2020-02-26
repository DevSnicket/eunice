// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import whenDefault from "./whenDefault";
import whenVariableDeclarator from "./whenVariableDeclarator";

export default ({
	ancestors,
	parent,
}) =>
	whenDefault(
		{ parent },
	)
	||
	whenVariableDeclarator({
		ancestors,
		parent,
	});