/* Eunice
Copyright (c) 2018 Graham Dyson.
This program is free software: you can redistribute it and/or modify it under the terms of the GNU Affero General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.
This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero General Public License for more details.
You should have received a copy of the GNU Affero General Public License along with this program. If not, see <https://www.gnu.org/licenses/>.
SPDX-License-Identifier: AGPL-3.0-or-later
*/

import "./index.css";

import { Component, createElement } from "react";
import { render } from "react-dom";

export default
/**
 * @param {Object} parameter
 * @param {renderStateful} parameter.renderStateful
 * @param {State} [parameter.initialState]
 *
 * @callback renderStateful
 * @param {Stateful} stateful
 * @returns {import("react/index").ReactNode}
 *
 * @typedef Stateful
 * @property {State} state
 * @property {setState} setState
 *
 * @callback setState
 * @param {State} state
 */
/**
 * @template State
 */
({
	renderStateful,
	initialState,
}) =>
	render(
		createElement(
			// @ts-ignore
			(props, context) => {
				const componentMixin =
					{
						...Component.prototype,
						context,
						props,
						render() {
							return renderStateful(this);
						},
						state: initialState,
					};

				window.addEventListener(
					"hashchange",
					// @ts-ignore
					() => componentMixin.forceUpdate(),
				);

				return componentMixin;
			},
		),
		document.getElementById("container"),
	);