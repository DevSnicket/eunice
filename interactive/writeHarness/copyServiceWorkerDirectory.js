// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import { copy } from "fs-extra";
import path from "path";

const directoryName = "monaco-editor";

export default ({
	from,
	to,
}) =>
	copy(
		path.join(from, directoryName),
		path.join(to, directoryName),
	);