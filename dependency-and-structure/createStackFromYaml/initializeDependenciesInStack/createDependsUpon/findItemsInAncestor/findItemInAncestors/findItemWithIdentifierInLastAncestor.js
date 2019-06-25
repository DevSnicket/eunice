/* Copyright (c) 2018 Graham Dyson. All Rights Reserved.
Licensed under the MIT license. See LICENSE file in the repository root for full license information. */

module.exports =
	({
		ancestors,
		identifier,
	}) => {
		const lastAncestor = ancestors[0];

		return (
			lastAncestor.items
			&&
			lastAncestor.items
			.flat()
			.find(item => item.id === identifier)
		);
	};