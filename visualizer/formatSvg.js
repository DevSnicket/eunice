// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import formatXml from "xml-formatter";

export default
svg =>
	formatXml(
		svg,
		{
			collapseContent: true,
			indentation: "\t",
			lineSeparator: "\n",
		},
	);