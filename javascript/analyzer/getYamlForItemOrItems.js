// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import { safeDump as formatYaml } from "js-yaml";

export default
itemOrItems =>
	itemOrItems
	?
	formatYaml(itemOrItems, { lineWidth: Number.MAX_SAFE_INTEGER })
	.trim()
	:
	"";