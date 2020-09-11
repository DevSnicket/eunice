node --experimental-modules updateMenusAndFooter/index.js
node --experimental-modules licensing/updateFromSponsor.js
(cd csharp/releases && node --experimental-modules updateReleasesListInHtmlFile.js --access-token=$GITHUB_HARNESSES_TOKEN)
(cd issues && node --experimental-modules updateIssueListInHtmlFile.js --access-token=$GITHUB_HARNESSES_TOKEN)
(cd javascript/releases && node --experimental-modules updateReleasesListInHtmlFile.js --access-token=$GITHUB_HARNESSES_TOKEN)