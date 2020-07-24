// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import addDirectionAndStackOfDependenciesToStack from "./addDirectionAndStackOfDependenciesToStack";
import replaceDirectionAndStackWithCountOfDependenciesInStack from "./replaceDirectionAndStackWithCountOfDependenciesInStack";

/**
  * @param {import("@devsnicket/eunice-dependency-and-structure/Stack.d")} stack
  * @returns {import("./Stack.d")}
  */
export default
stack =>
	replaceDirectionAndStackWithCountOfDependenciesInStack(
		addDirectionAndStackOfDependenciesToStack(
			stack,
		),
	);