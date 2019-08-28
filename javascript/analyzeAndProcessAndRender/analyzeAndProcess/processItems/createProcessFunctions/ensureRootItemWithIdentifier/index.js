// Copyright (c) 2019 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const isSingleAnonymous = require("../isSingleAnonymous");

module.exports =
	({
		identifier,
		items,
	}) => {
		return whenHasIdentifier() || items;

		function whenHasIdentifier() {
			return identifier && createItemWithIdentifier();

			function createItemWithIdentifier() {
				return (
					(isSingleAnonymous(items) && replaceIdentifier())
					||
					{
						id: identifier,
						items,
					}
				);

				function replaceIdentifier() {
					return (
						{
							id: identifier,
							...items,
						}
					);
				}
			}
		}
	};