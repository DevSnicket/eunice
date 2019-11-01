/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

module.exports =
	({
		createElement,
		orientation,
	}) => {
		return (
			createElement(
				"div",
				null,
				whenHorizontal() || whenVertical(),
			)
		);

		function whenHorizontal() {
			return (
				orientation === "horizontal"
				&&
				ofCharacter("\u2015")
			);

			function ofCharacter(
				character,
			) {
				return (
					[
						createElement("br", { key: 0 }),
						character,
						createElement("br", { key: 1 }),
						character,
						createElement("br", { key: 2 }),
						character,
					]
				);
			}
		}

		function whenVertical() {
			return (
				orientation === "vertical"
				&&
				"|".repeat(3)
			);
		}
	};