// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const { createStackFromYaml } = require("@devsnicket/eunice-dependency-and-structure");

module.exports =
	({
		ancestors,
		yaml,
	}) => {
		return (
			getDescendantInSingleItemStackHierarchy({
				depth:
					ancestors.length,
				stack:
					createStackFromYaml(
						getYamlWithAncestors(),
					),
			})
		);

		function getYamlWithAncestors() {
			return (
				ancestors
				.reduceRight(
					(items, ancestor) => (
						{
							id: ancestor.id,
							items,
						}
					),
					yaml,
				)
			);
		}
	};

function getDescendantInSingleItemStackHierarchy({
	depth,
	stack,
}) {
	return whenDeeper() || stack;

	function whenDeeper() {
		return (
			depth
			&&
			getDescendantInSingleItemStackHierarchy({
				depth: depth - 1,
				stack: stack[0][0].items,
			})
		);
	}
}