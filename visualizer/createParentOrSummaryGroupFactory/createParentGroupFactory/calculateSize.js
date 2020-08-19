// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

import borderThickness from "./borderThickness";
import stackMargin from "./stackMargin";
import withPrecision from "../../withPrecision";

export default ({
	getTextWidth,
	identifier,
	innerDependencyGroupFactory,
	stackGroupFactory,
}) => {
	return {
		height:
			calculateHeight(),
		width:
			withPrecision(
				calculateWidth(),
			),
	};

	function calculateHeight() {
		return (
			identifier.height
			+
			stackMargin
			+
			stackGroupFactory.height
			+
			stackMargin
			+
			borderThickness
			+
			(innerDependencyGroupFactory ? innerDependencyGroupFactory.height : 0)
		);
	}

	function calculateWidth() {
		return (
			borderThickness
			+
			stackMargin
			+
			Math.max(
				stackGroupFactory.width,
				getTextWidth(identifier.text),
			)
			+
			stackMargin
			+
			borderThickness
		);
	}
};