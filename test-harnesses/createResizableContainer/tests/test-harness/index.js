/* Eunice
Copyright (c) 2019 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import { ReflexContainer, ReflexElement, ReflexSplitter } from "react-reflex";

import { createElement } from "react";
import createHashFromLocation from "../../../createHashFromLocation";
import createResizableContainer from "../..";
import renderIntoContainerElement from "../../../renderIntoContainerElement";

renderIntoContainerElement({
	initialState:
		null,
	renderStateful:
		() => {
			const
				flexKeysAndValues =
					createHashFromLocation(location),
				resizableElementTypes =
					{
						container: ReflexContainer,
						item: ReflexElement,
						splitter: ReflexSplitter,
					};

			return (
				createResizableContainer({
					createElement,
					flexKeysAndValues,
					items:
						[
							{ element: createElement("div", null, "left") },
							{
								element: createElement("div", null, "middle"),
								flex: { default: 0.6 },
							},
							{
								element:
									createResizableContainer({
										createElement,
										flexKeysAndValues,
										items:
											[
												{
													element: createElement("div", null, "right upper"),
													flex: { key: "right-upper-height" },
												},
												{ element: createElement("div", null, "right lower") },
											],
										orientation:
											"horizontal",
										resizableElementTypes,
									}),
								flex:
									{ key: "right-width" },
							},
						],
					orientation:
						"vertical",
					resizableElementTypes,
				})
			);
		},
});