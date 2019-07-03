/* Copyright (c) 2019 Graham Dyson. All Rights Reserved.
This library is free software, licensed under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version. You should have received a copy of the GNU General Public License along with this program.  If not, see <http://www.gnu.org/licenses/>. */

const
	removePrefixAndScopeInDependsUpon = require("./removePrefixAndScopeInDependsUpon"),
	removePrefixInDependsUpon = require("./removePrefixInDependsUpon"),
	{ replaceDependsUpon } = require("@devsnicket/eunice-processors");

module.exports =
	({
		items,
		prefix,
		scope,
	}) => {
		return (
			whenHasScope()
			||
			whenHasPrefix()
			||
			items
		);

		function whenHasScope() {
			return (
				scope
				&&
				replaceDependsUpon({
					getDependsUponReplacement:
						dependsUpon =>
							removePrefixAndScopeInDependsUpon({
								dependsUpon,
								prefix,
								scope,
							}),
					identifierOrItemOrLevelOrStack:
						items,
				})
			);
		}

		function whenHasPrefix() {
			return (
				prefix
				&&
				replaceDependsUpon({
					getDependsUponReplacement:
						dependsUpon =>
							removePrefixInDependsUpon({
								dependsUpon,
								prefix,
							}),
					identifierOrItemOrLevelOrStack:
						items,
				})
			);
		}
	};