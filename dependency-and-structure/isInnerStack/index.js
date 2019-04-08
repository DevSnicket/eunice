/**
  * @typedef Stack
  * @property {Item} [parent]
  *
  * @typedef Item
  * @property {Level} level
  *
  * @typedef Level
  * @property {Stack} stack
 */

module.exports =
	/**
	 * @param {Object} parameter
	 * @param {Stack} parameter.source
	 * @param {Stack} parameter.target
	 * @returns {Boolean}
	 */
	({
		source,
		target,
	}) =>
		withSource(source)
		.isInner(target);

function withSource(
	source,
) {
	return { isInner };

	function isInner(
		target,
	) {
		return (
			source !== target
			&&
			Boolean(hasAncestorOfSource(target))
		);
	}

	function hasAncestorOfSource(
		{ parent },
	) {
		return (
			parent
			&&
			isSourceOrHasAncestorOfSource(parent.level.stack)
		);
	}

	function isSourceOrHasAncestorOfSource(
		target,
	) {
		return (
			source === target
			||
			hasAncestorOfSource(target)
		);
	}
}