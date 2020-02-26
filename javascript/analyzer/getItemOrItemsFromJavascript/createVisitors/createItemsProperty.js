// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import stackItemsWhenMultiple from "./stackItemsWhenMultiple";

export default
items =>
	items
	&&
	{
		items:
			stackItemsWhenMultiple({
				items,
				withSingleInArray: false,
			}),
	};