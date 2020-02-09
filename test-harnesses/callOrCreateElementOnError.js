/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

export default ({
	action,
	createElement,
}) => {
	try {
		return action();
	} catch (error) {
		return createElement("div", null, error.message);
	}
};