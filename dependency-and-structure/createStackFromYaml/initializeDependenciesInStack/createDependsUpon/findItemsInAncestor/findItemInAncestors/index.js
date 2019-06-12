require("array.prototype.flat")
.shim();

require("array.prototype.flatmap")
.shim();

const
	createFromIdentifiers = require("../../createFromIdentifiers"),
	whenIdentifier = require("./whenIdentifier"),
	whenItemFound = require("./whenItemFound");

module.exports = findInAncestors;

function findInAncestors({
	ancestors,
	dependUponItem,
}) {
	return (
		whenIdentifier({
			ancestors,
			dependUponItem,
		})
		||
		whenItemFound({
			ancestors,
			dependUponItem,
			findInAncestors,
		})
		||
		fromIdentifiers()
	);

	function fromIdentifiers() {
		return (
			createFromIdentifiers(dependUponItem)
			.map(
				dependUpon => (
					{
						ancestors:
							[ ...dependUpon.ancestors, ...ancestors ],
						item:
							dependUpon.item,
					}
				),
			)
		);
	}
}