node --experimental-modules updateMenusAndFooter/index.js
node --experimental-modules licensing/updateFromSponsor.js
(cd csharp/releases && node --experimental-modules updateReleasesListInHtmlFile.js --access-token=$1)
node --experimental-modules blog/updateFromPosts/index.js
(cd issues && node --experimental-modules updateIssueListInHtmlFile.js --access-token=$1)
(cd javascript/releases && node --experimental-modules updateReleasesListInHtmlFile.js --access-token=$1)