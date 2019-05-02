module.exports = getItemIdentifierHierarchy;

function getItemIdentifierHierarchy({
	id,
	level: { stack: { parent } },
}) {
	return (
		[
			...getAncestorsWhenHasParent() || [],
			id,
		]
	);

	function getAncestorsWhenHasParent() {
		return (
			parent
			&&
			getItemIdentifierHierarchy(parent)
		);
	}
}