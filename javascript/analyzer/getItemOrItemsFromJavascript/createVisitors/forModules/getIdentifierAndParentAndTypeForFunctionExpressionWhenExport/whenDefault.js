// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

module.exports =
	({ parent }) =>
		parent.type === "ExportDefaultDeclaration"
		&&
		{ type: "export" };