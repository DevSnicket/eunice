// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

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