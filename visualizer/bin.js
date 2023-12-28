#!/usr/bin/env node
/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

/* istanbul ignore file: test would be a mirror of implementation */

import { createElement } from "react";
import { createStackFromYaml } from "../dependency-and-structure";
import fileSystem from "fs-extra";
import formatSvg from "./formatSvg";
import getSvgElementForStack from ".";
import getTextWidth from "string-pixel-width";
import { safeLoad as parseYaml } from "js-yaml";
import { renderToStaticMarkup } from "react-dom/server";

/* eslint-disable no-console */

const yamlFilePath = process.argv[2];

console.log(
	yamlFilePath
	?
	formatSvg(
		renderToStaticMarkup(
			getSvgElementForStack({
				createElement,
				getTextWidth,
				// @ts-ignore
				stack:
					createStackFromYaml(
						// @ts-ignore
						parseYaml(
							fileSystem.readFileSync(yamlFilePath, "utf-8"),
						),
					),
			}),
		),
	)
	:
	"Missing argument of YAML file path.",
);