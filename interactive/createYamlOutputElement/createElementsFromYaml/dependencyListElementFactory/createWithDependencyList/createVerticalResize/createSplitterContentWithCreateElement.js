// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

module.exports =
	createElement => {
		return (
			createElement(
				"div",
				null,
				createIcon(),
			)
		);

		function createIcon() {
			const horizontalBar = "\u2015";

			return (
				[
					createElement("br", { key: 0 }),
					horizontalBar,
					createElement("br", { key: 1 }),
					horizontalBar,
					createElement("br", { key: 2 }),
					horizontalBar,
				]
			);
		}
	};