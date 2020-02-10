// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import createFirstAndSecondLevel from "../../createFirstAndSecondLevel";
import createStackFromLevels from "../../../createStackFromLevels";

export default
() => {
	const stack = createStackFromLevels([ createFirstAndSecondLevel() ]);

	const [ first, second ] = stack[0];

	return (
		{
			first,
			second,
			stack,
		}
	);
};