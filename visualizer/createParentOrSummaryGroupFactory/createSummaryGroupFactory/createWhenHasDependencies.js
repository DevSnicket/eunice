/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

export default ({
	innerDependencyGroupFactory,
	stackGroupFactory,
}) => {
	return (
		innerDependencyGroupFactory
		&&
		create()
	);

	function create() {
		const topOffset = stackGroupFactory.height + 28;

		return (
			{
				createAtPosition,
				height:
					topOffset + innerDependencyGroupFactory.height,
				summaryTopOffset:
					topOffset,
				width:
					stackGroupFactory.width,
			}
		);

		function createAtPosition({
			left,
			top,
		}) {
			return (
				[
					...stackGroupFactory.createAtPosition({
						left,
						top,
					}),
					...innerDependencyGroupFactory.createAtPosition({
						left:
							left + (stackGroupFactory.width / 2),
						top:
							top + topOffset,
					}),
				]
			);
		}
	}
};