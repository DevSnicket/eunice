#!/bin/bash

set -e

cd $(dirname "$0")

echo running Tests
dotnet test \
Tests \
-c Release \
-l "trx;LogFilePrefix=_" \
-p:AltCover=true \
-p:AltCoverAssemblyFilter="^(?!eunice$)" \
-p:AltCoverAttributeFilter=ExcludeFromCodeCoverageAttribute \
-p:AltCoverForce=true \
-p:AltCoverXmlReport=TestResults/coverage.xml

writeReport () {
	echo generating coverage report for $1
	reportFile=Tests/TestResults/coverage.netcoreapp$1.xml
	if [ -f $reportFile ]; then
		dotnet reportgenerator \
		-reports:$reportFile \
		-reporttypes:"Html;JsonSummary" \
		-targetdir:Tests/TestResults/CoverageReport$1
	else
		echo report file not found $reportFile
	fi
}
writeReport 3.1
writeReport 5.0
writeReport 6.0
writeReport 7.0
writeReport 8.0

getCoverage () {
	value=$(grep -Po "(?<=\"$1coverage\": )[\.0-9]*" Tests/TestResults/CoverageReport8.0/Summary.json | head -1)
	if [ -z $value ]; then
		echo 100
	else
		echo $value
	fi
}
echo
branchcoverage=$(getCoverage "branch")
echo branch coverage: $branchcoverage%
linecoverage=$(getCoverage "line")
echo line coverage: $linecoverage%
if [ $branchcoverage != 100 ] || [ $linecoverage != 100 ]; then
	exit 1
fi