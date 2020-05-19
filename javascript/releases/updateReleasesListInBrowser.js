import requestAndFormatHtmlForReleasesList from "./requestAndFormatHtmlForReleasesList.js"

requestAndFormatHtmlForReleasesList(
	url =>
		fetch(url)
		.then(response => response.json()),
)
.then(
	html =>
		document.getElementById("releases-list").innerHTML = html,
);