/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

import { createElement } from "react";

export default ({
	setStateFromValue,
	value,
}) =>
	createElement(
		"textarea",
		{
			onChange: event => setStateFromValue(event.target.value),
			value,
			wrap: "off",
		},
	);