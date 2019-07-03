/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

module.exports =
	createElement => {
		return (
			createElement(
				"div",
				null,
				createIcon(),
			)
		);

		function createIcon() {
			const horizontalBar = "\u2015";

			return (
				[
					createElement("br", { key: 0 }),
					horizontalBar,
					createElement("br", { key: 1 }),
					horizontalBar,
					createElement("br", { key: 2 }),
					horizontalBar,
				]
			);
		}
	};