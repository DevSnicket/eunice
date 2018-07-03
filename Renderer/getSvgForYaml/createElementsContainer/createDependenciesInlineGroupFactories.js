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
			}),
			createDependencyGroupFactoryWhenRequired({
				arrow: arrows.up,
				count: countWithDirection.above,
			}),
			createDependencyGroupFactoryWhenRequired({
				arrow: arrows.right,
				count: countWithDirection.same,
			}),
		]
		.filter(groupFactory => groupFactory);