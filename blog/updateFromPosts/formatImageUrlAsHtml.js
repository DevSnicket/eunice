export default
function * (
	url,
) {
	if (url)
		yield `<a href="${url}" target="_blank"><img src="${url}"/></a>`;
}