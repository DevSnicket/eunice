// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import { createElement } from "react";

export default
({ element, item, level, relationship }) =>
	createElement(
		"a",
		{ href: `#id=${item.id}&level=${level}&relationship=${relationship}` },
		element,
	);