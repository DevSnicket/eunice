// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const getNamesFromDestructureOrIdentifier = require("../getNamesFromDestructureOrIdentifier");

module.exports =
	({
		ancestors,
		name,
	}) => {
		for (let index = ancestors.length - 2; index; index--) {
			const ancestor = ancestors[index];

			if (ancestor.params)
				if (ancestor.body.type === "BlockStatement")
					return includesParameter(ancestor.params);
				else if (includesParameter(ancestor.params))
					return true;
		}

		return false;

		function includesParameter(
			parameters,
		) {
			return (
				parameters
				.some(
					parameter =>
						getNamesFromDestructureOrIdentifier(parameter)
						.includes(name),
				)
			);
		}
	};