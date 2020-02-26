// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import isModuleExport from "./isModuleExport";

export default
node =>
	node.type === "MemberExpression"
	&&
	isModuleExport(node);