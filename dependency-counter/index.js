// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import addDirectionAndStackOfDependenciesToStack from "./addDirectionAndStackOfDependenciesToStack";
import replaceDirectionAndStackWithCountOfDependenciesInStack from "./replaceDirectionAndStackWithCountOfDependenciesInStack";

export default (
	/** @type {import("@devsnicket/eunice-dependency-and-structure/Stack.d")} */
	stack,
) => {
	addDirectionAndStackOfDependenciesToStack(
		stack,
	);

	replaceDirectionAndStackWithCountOfDependenciesInStack(
		stack,
	);
};