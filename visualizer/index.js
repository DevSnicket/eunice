/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import createDependencyGroupFactories from "./createDependencyGroupFactories";
import createParentOrSummaryGroupFactory from "./createParentOrSummaryGroupFactory";
import createStackGroupFactory from "./createStackGroupFactory";
import createSvgElement from "./createSvgElement";
import createTextGroup from "./createTextGroup";
import withPrecision from "./withPrecision";

export default (/** @type {import("./Parameter.d")} */{
	areDependenciesOfAncestorsIncluded = false,
	createElement,
	elementContainerFactory = null,
	getTextWidth,
	namespaces = null,
	stack,
	style = "",
}) => {
	const
		font =
			createFont({
				family: "arial",
				getTextWidth,
				size: 16,
			});

	const dependencyGroupFactories =
		createDependencyGroupFactories({
			areAncestorsIncluded:
				areDependenciesOfAncestorsIncluded,
			createElement,
			createTextGroup:
				createTextGroupWithFontSizeAndPrecision,
			elementContainerFactory,
			font,
			withPrecision,
		});

	return (
		createSvgElement({
			createElement,
			font,
			groupFactory:
				stack
				&&
				createGroupFactory(),
			namespaces,
			style:
				/* cspell:disable-next-line */
				`g.anonymous>text{font-style:italic}g.item>rect{fill:lightgray}g.item>text{text-anchor:middle}g.dependency>text{fill:white;text-anchor:middle}${style}`,
			symbols:
				dependencyGroupFactories.symbols,
			withPrecision,
		})
	);

	function createGroupFactory() {
		return (
			stack
			&&
			createParentOrSummaryGroupFactory({
				createElement,
				createTextGroup:
					createTextGroupWithFontSizeAndPrecision,
				dependencyGroupFactories,
				font,
				stack,
				stackGroupFactory:
					createStackGroupFactory({
						createTextGroup:
							createTextGroupWithFontSizeAndPrecision,
						dependencyGroupFactories,
						elementContainerFactory,
						font,
						stack,
					}),
			})
		);
	}

	function createTextGroupWithFontSizeAndPrecision(
		parameters,
	) {
		return (
			createTextGroup({
				createElement,
				fontSize: font.size,
				...parameters,
			})
		);
	}
};

function createFont({
	family,
	getTextWidth,
	size,
}) {
	const getTextWidthOptions = {
		font: family,
		size,
	};

	return (
		{
			family,
			measure: text => withPrecision(getTextWidth(text, getTextWidthOptions)),
			size,
		}
	);
}