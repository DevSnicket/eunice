echo menus and footer
node --experimental-modules updateMenusAndFooter/index.js

echo csharp releases
(cd csharp/releases && node --experimental-modules updateReleasesListInHtmlFile.js --access-token=$1)

echo posts
node --experimental-modules blog/updateFromPosts/index.js

echo issues
(cd issues && node --experimental-modules updateIssueListInHtmlFile.js --access-token=$1)

echo javascript releases
(cd javascript/releases && node --experimental-modules updateReleasesListInHtmlFile.js --access-token=$1)