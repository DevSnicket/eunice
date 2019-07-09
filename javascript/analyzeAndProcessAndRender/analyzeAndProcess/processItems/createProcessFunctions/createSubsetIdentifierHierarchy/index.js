/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const isSingleAnonymous = require("../isSingleAnonymous");

module.exports =
	({
		items,
		rootItemIdentifier,
	}) => {
		return (
			whenHasRootItem()
			||
			whenSingleAnonymous()
			||
			null
		);

		function whenHasRootItem() {
			return (
				rootItemIdentifier
				&&
				[ rootItemIdentifier ]
			);
		}

		function whenSingleAnonymous() {
			return (
				isSingleAnonymous(items)
				&&
				// the items id property wont be defined
				// eslint-disable-next-line no-undefined
				[ undefined ]
			);
		}
	};