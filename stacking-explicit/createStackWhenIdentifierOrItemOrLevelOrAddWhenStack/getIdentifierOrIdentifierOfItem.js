// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Licensed under the MIT license. See LICENSE file in the repository root for full license information.

export default
identifierOrItem => {
	return (
		whenString()
		||
		whenHasIdentifier()
		||
		null
	);

	function whenString() {
		return (
			typeof identifierOrItem === "string"
			&&
			identifierOrItem
		);
	}

	function whenHasIdentifier() {
		return (
			identifierOrItem
			&&
			identifierOrItem.id
		);
	}
};