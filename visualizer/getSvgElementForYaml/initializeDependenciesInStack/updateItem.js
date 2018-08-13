module.exports =
	({
		dependsUponItems,
		item,
	}) => {
		item.dependsUpon = dependsUponItems;

		for (const dependsUponItem of dependsUponItems)
			if (typeof dependsUponItem === "object")
				addDependent({
					dependent: item,
					item: dependsUponItem,
				});
	};

function addDependent({
	item,
	dependent,
}) {
	if (item.dependents)
		item.dependents.push(dependent);
	else
		item.dependents = [ dependent ];
}