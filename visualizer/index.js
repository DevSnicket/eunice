// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import createArrows from "./createArrows";
import createParentGroupFactoryWhenChild from "./createParentGroupFactoryWhenChild";
import createStackWithSummaryGroupFactory from "./createStackWithSummaryGroupFactory";
import createSvgElement from "./createSvgElement";
import createTextGroup from "./createTextGroup";
import withPrecision from "./withPrecision";

export default (/** @type {import("./Parameter.d")} */{
	createElement,
	elementContainerFactory = null,
	getTextWidth,
	namespaces = null,
	stack,
	style = "",
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
			createElement,
			font,
			groupFactory:
				createGroupFactory(),
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

	function createGroupFactory() {
		return (
			stack
			&&
			createParentGroupFactoryWhenChild({
				arrows,
				childGroupFactory:
					createStackWithSummaryGroupFactory({
						arrows,
						createTextGroup:
							createTextGroupWithFontSizeAndPrecision,
						elementContainerFactory,
						font,
						stack,
					}),
				createTextGroup:
					createTextGroupWithFontSizeAndPrecision,
				elementContainerFactory,
				font,
				stack,
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