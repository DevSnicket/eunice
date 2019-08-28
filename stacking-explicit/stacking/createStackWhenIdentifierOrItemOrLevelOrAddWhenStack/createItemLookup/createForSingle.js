// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Licensed under the MIT license. See LICENSE file in the repository root for full license information.

module.exports =
	({
		identifier,
		item,
	}) => {
		let used = false;

		return (
			{
				getIdentifiersNotUsed,
				getItemWithIdentifier,
			}
		);

		function getIdentifiersNotUsed() {
			return used ? null : [ identifier ];
		}

		function getItemWithIdentifier(
			targetIdentifier,
		) {
			if (identifier === targetIdentifier) {
				used = true;

				return item;
			} else
				return null;
		}
	};