// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import prettyFormat from "pretty-format";

export default
stack =>
	prettyFormat(
		stack,
		{ min: true },
	);