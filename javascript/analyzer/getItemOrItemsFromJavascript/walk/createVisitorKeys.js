// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

// @ts-ignore
import { VISITOR_KEYS as visitorKeys } from "@babel/types";

export default () => (
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