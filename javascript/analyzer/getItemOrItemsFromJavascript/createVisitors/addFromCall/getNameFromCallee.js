// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const removeJsFilePathExtension = require("../removeJsFilePathExtension");

module.exports =
	callee => {
		return (
			getRequireWhenCalled()
			||
			getWhenMember()
			||
			callee.name
		);

		function getRequireWhenCalled() {
			return (
				callee.callee
				&&
				callee.callee.name === "require"
				&&
				removeJsFilePathExtension(callee.arguments[0].value)
			);
		}

		function getWhenMember() {
			return (
				callee.type === "MemberExpression"
				&&
				getObjectName(callee.object)
			);
		}
	};

function getObjectName({
	name,
	object,
}) {
	return (
		name
		||
		(object && getObjectName(object))
	);
}