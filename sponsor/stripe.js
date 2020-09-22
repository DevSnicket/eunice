function withProduct(
	product,
) {
	return {
		clearError,
		buy,
	};

	function buy(
		mode,
	) {
		withModeAndShowError({
			mode,
			showError,
		})
		.buyPriceInputElement(
			document.querySelector(`input[name="${product}-price"]:checked`),
		);
	}

	function clearError() {
		getErrorElement().style.display = "none";
	}

	function showError(
		error,
	) {
		const errorElement = getErrorElement();
		errorElement.style.display = "block";
		errorElement.textContent = error;
	}

	function getErrorElement() {
		return document.getElementById(`${product}-error`);
	}
}

function withModeAndShowError({
	mode,
	showError,
}) {
	return { buyPriceInputElement };

	function buyPriceInputElement(
		priceInputElement,
	) {
		if (priceInputElement)
			buyPrice(
				stripeIdentifiers[priceInputElement.value],
			);
		else
			showError("Please select a currency.");
	}

	function buyPrice(
		price,
	) {
		Stripe(stripeIdentifiers.key)
		.redirectToCheckout({
			cancelUrl:
				window.location.href,
			lineItems: [ {
				price,
				quantity:
					1,
			} ],
			mode,
			successUrl:
				`${window.location.href}../sponsor/success/`,
		})
		.then(
			result =>
				result.error
				&&
				showError(result.error.message),
		);
	}
}

const stripeIdentifiers =
	{
		"company-monthly-gbp": "price_1HTkMeBWZAA2SAp55VW5NJtz",
		"company-monthly-eur": "price_1HTkMeBWZAA2SAp5QXAzqovM",
		"company-monthly-usd": "price_1HTkMfBWZAA2SAp5pClSk3Ke",
		"company-one-year-gbp": "price_1HTkMfBWZAA2SAp5M9OLxfOg",
		"company-one-year-eur": "price_1HTkMfBWZAA2SAp5DVqarxuE",
		"company-one-year-usd": "price_1HTkMeBWZAA2SAp5yjqymHhl",
		"individual-monthly-gbp": "price_1HTkGRBWZAA2SAp5tYyHdr2Q",
		"individual-monthly-eur": "price_1HTkGRBWZAA2SAp5eiczXIcH",
		"individual-monthly-usd": "price_1HTkGRBWZAA2SAp5lPD8PpYk",
		key: "pk_test_51HTA9KBWZAA2SAp5ztuaJCiMbtEr1XkFt5SGL8Bl8lCgU8CnGT0N4TXZp8Rz4cSYtV9nzzTLaet8gpxBkptlr3cw00RmX7NrMw",
	};