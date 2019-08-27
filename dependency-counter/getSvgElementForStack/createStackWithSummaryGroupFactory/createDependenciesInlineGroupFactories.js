// Copyright (c) 2018 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

module.exports =
	({
		arrows,
		countWithDirection,
		createDependencyGroupFactoryWhenRequired,
	}) =>
		[
			createDependencyGroupFactoryWhenRequired({
				arrow: arrows.down,
				count: countWithDirection.below,
				keySuffix: "below",
			}),
			createDependencyGroupFactoryWhenRequired({
				arrow: arrows.up,
				count: countWithDirection.above,
				keySuffix: "above",
			}),
			createDependencyGroupFactoryWhenRequired({
				arrow: arrows.right,
				count: countWithDirection.same,
				keySuffix: "same",
			}),
		]
		.filter(groupFactory => groupFactory);