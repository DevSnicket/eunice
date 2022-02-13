find . \
	-type f \
	-name "*.html" \
	! -name eunice.html \
	! -path ./case-studies/eunice.html \
	! -path ./dogfooding/index.html \
	! -path ./interactive/index.html \
	! -path ./javascript/analyzer-harness/index.html \
	! -path ./javascript/harness/index.html \
	! -path ./licensing/index.html \
	-exec npx cspell {} +
