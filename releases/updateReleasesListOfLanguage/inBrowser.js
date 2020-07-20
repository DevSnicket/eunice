import requestAndFormatHtmlForReleasesList from "../requestAndFormatHtmlForReleasesList.js"

export default language =>
	requestAndFormatHtmlForReleasesList({
		language,
		requestJsonFromUrl:
			url =>
				fetch(url)
				.then(response => response.json()),
	})
	.then(
		html =>
			document.getElementById("releases-list").innerHTML = html,
	);