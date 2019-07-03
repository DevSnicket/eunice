/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

module.exports =
	({
		ancestors,
		parentIdentifierPattern,
	}) => {
		return (
			Boolean(
				isParentIdentifierMatch(
					getParentIdentifier(),
				),
			)
		);

		function getParentIdentifier() {
			return (
				ancestors.length
				&&
				ancestors[ancestors.length - 1].id
			);
		}

		function isParentIdentifierMatch(
			identifier,
		) {
			return (
				identifier
				&&
				identifier.match(parentIdentifierPattern)
			);
		}
	};