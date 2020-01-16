// Copyright (c) 2020 Graham Dyson. All Rights Reserved. Unauthorized copying of this file, via any medium is strictly prohibited. Proprietary and confidential.

const
	{ trimEnd } = require("lodash"),
	splitAbsoluteAndParentRelative = require("./splitAbsoluteAndParentRelative"),
	splitWhenRelative = require("./splitWhenRelative");

const pathSeparator = "/";

module.exports =
	({
		dependsUpon,
		directoryPathRelative,
	}) => {
		return (
			whenString()
			||
			whenHasIdentifier()
			||
			dependsUpon
		);

		function whenString() {
			return (
				typeof dependsUpon === "string"
				&&
				asString()
			);

			function asString() {
				return (
					splitIdentifierAndItems({
						identifier: dependsUpon,
						items: null,
					})
					||
					trimEnd(dependsUpon, pathSeparator)
				);
			}
		}

		function whenHasIdentifier() {
			return (
				dependsUpon
				&&
				dependsUpon.id
				&&
				splitIdentifierAndItems({
					identifier: dependsUpon.id,
					items: dependsUpon.items,
				})
			);
		}

		function splitIdentifierAndItems({
			identifier,
			items,
		}) {
			return (
				splitWhenRelative({
					directoryPathRelative,
					identifier,
					items,
					pathSeparator,
				})
				||
				splitAbsoluteAndParentRelative({
					directoryPathRelative,
					identifier,
					items,
					pathSeparator,
				})
			);
		}
	};