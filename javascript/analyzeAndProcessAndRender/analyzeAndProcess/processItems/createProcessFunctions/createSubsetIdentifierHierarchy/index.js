// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const isSingleAnonymous = require("../isSingleAnonymous");

module.exports =
	({
		items,
		rootItemIdentifier,
	}) => {
		return (
			whenHasRootItem()
			||
			whenSingleAnonymous()
			||
			null
		);

		function whenHasRootItem() {
			return (
				rootItemIdentifier
				&&
				[ rootItemIdentifier ]
			);
		}

		function whenSingleAnonymous() {
			return (
				isSingleAnonymous(items)
				&&
				// the items id property wont be defined
				// eslint-disable-next-line no-undefined
				[ undefined ]
			);
		}
	};