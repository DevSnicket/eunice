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