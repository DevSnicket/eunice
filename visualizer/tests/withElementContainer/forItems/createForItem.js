// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import { createElement } from "react";

export default
({ element, item }) =>
	createElement(
		"a",
		{ href: `#${item.id}` },
		element,
	);