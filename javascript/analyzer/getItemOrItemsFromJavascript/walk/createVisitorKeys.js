// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const { VISITOR_KEYS: visitorKeys } = require("@babel/types");

module.exports =
	() => (
		{
			...visitorKeys,
			...createForEstree(),
		}
	);

function createForEstree() {
	return (
		{
			MethodDefinition:
				[ "key", "value" ],
			Property:
				[ "key", "value" ],
		}
	);
}