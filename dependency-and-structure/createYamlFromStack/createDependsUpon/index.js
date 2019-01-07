const
	getIdentifierPropertyOrValue = require("./getIdentifierPropertyOrValue"),
	groupByParent = require("./groupByParent");

module.exports =
	dependsUpon =>
		dependsUpon.length === 1
		?
		createSingleDependUpon(dependsUpon[0])
		:
		groupByParent(dependsUpon);

function createSingleDependUpon(
	dependUpon,
) {
	return getWhenParent() || getIdentifierPropertyOrValue(dependUpon.item);

	function getWhenParent() {
		return (
			dependUpon.parent
			&&
			{
				id:
					getIdentifierPropertyOrValue(
						dependUpon.parent,
					),
				items:
					getIdentifierPropertyOrValue(
						dependUpon.item,
					),
			}
		);
	}
}