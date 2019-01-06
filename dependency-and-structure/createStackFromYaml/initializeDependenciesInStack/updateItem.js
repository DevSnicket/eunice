module.exports =
	({
		dependsUpon,
		item,
	}) => {
		item.dependsUpon = dependsUpon;

		for (const { item: dependUponItem } of dependsUpon)
			if (typeof dependUponItem === "object")
				addDependent({
					dependent: item,
					item: dependUponItem,
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