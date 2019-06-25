/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const
	createArrows = require("./createArrows"),
	createParentGroupFactoryFromSubsetIdentifierHierarchy = require("./createParentGroupFactoryFromSubsetIdentifierHierarchy"),
	createStackWithSummaryGroupFactory = require("./createStackWithSummaryGroupFactory"),
	createSvgElement = require("./createSvgElement"),
	createTextGroup = require("./createTextGroup"),
	withPrecision = require("./withPrecision");

module.exports =
	(/** @type {import("./Parameter.d")} */{
		createElement,
		elementContainerFactory = null,
		getTextWidth,
		namespaces = null,
		stack,
		style = "",
		subsetIdentifierHierarchy = null,
	}) => {
		const
			arrows =
				createArrows({ createElement, withPrecision }),
			font =
				createFont({
					family: "arial",
					getTextWidth,
					size: 16,
				});

		return (
			createSvgElement({
				childGroupFactory:
					stack
					&&
					initializeAndCreateChildGroupFactory(),
				createElement,
				font,
				namespaces,
				style:
					/* cspell:disable-next-line */
					`g.anonymous>text{font-style:italic}g.parent>rect{fill:none;stroke:gray}g.item>rect{fill:lightgray}g.item>text{text-anchor:middle}g.dependency>text{fill:white;text-anchor:middle}${style}`,
				symbols:
					Object.values(arrows)
					.map(arrow => arrow.symbol),
				withPrecision,
			})
		);

		function initializeAndCreateChildGroupFactory() {
			return (
				subsetIdentifierHierarchy
				?
				createParentGroupFactoryFromSubsetIdentifierHierarchy({
					arrows,
					createGroupFactoryForStack,
					createTextGroup: createTextGroupWithFontSizeAndPrecision,
					font,
					stack,
					subsetIdentifierHierarchy,
				})
				:
				createGroupFactoryForStack(stack)
			);
		}

		function createGroupFactoryForStack(
			stackOrStackOfSubset,
		) {
			return (
				createStackWithSummaryGroupFactory({
					arrows,
					createTextGroup:
						createTextGroupWithFontSizeAndPrecision,
					elementContainerFactory,
					font,
					stack:
						stackOrStackOfSubset,
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
					withPrecision,
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
	const getTextWidthOptions = { font: family, size };

	return (
		{
			family,
			measure: text => withPrecision(getTextWidth(text, getTextWidthOptions)),
			size,
		}
	);
}