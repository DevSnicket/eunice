// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

export default ({
	identifierOrItemOrLevelOrStack,
	rootItemIdentifier,
}) => {
	return (
		whenHasRootSpecified()
		||
		whenSingleAnonymous()
		||
		null
	);

	function whenHasRootSpecified() {
		return (
			rootItemIdentifier
			&&
			[ rootItemIdentifier ]
		);
	}

	function whenSingleAnonymous() {
		return (
			isSingleAnonymous()
			&&
			// the items id property wont be defined
			// eslint-disable-next-line no-undefined
			[ undefined ]
		);

		function isSingleAnonymous() {
			return (
				!Array.isArray(identifierOrItemOrLevelOrStack)
				&&
				!identifierOrItemOrLevelOrStack.id
			);
		}
	}
};