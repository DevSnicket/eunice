const
	{ Component, createElement } = require("react"),
	{ render } = require("react-dom");

module.exports =
	component =>
		render(
			createElement(
				(props, context) => {
					const componentMixin =
						{
							...Component.prototype,
							context,
							props,
							...component,
						};

					window.addEventListener(
						"hashchange",
						() => componentMixin.forceUpdate(),
					);

					return componentMixin;
				},
			),
			document.getElementById("container"),
		);