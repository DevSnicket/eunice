/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

import createWebpackConfiguration from "../../../createWebpackConfiguration";
import path from "path";

export default
createWebpackConfiguration({
	directory:
		path.join(__dirname, "output"),
	indexFile:
		path.join(__dirname, "index.js"),
	title:
		"Columns Test Harness",
});