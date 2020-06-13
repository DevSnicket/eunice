#!/bin/bash

set -e

# https://github.com/dotnet/roslyn/issues/44822
dotnet restore AnalyzeProjectOrSolutionPath/Tests/TestCases/Generic/Class/Base/IEnumerable

dotnet test \
Tests \
-l "trx;LogFileName=.trx" \
-p:AltCover=true \
-p:AltCoverAssemblyFilter="^(?!DevSnicket.Eunice$)" \
-p:AltCoverForce=true \
-p:AltCoverMethodFilter=executeProgram \
-p:AltCoverXmlReport=TestResults/coverage.xml

dotnet tool install dotnet-reportgenerator-globaltool \
--tool-path . \
--version 4.5.6 \
|| true # ignore error raised when already installed

./reportgenerator \
-reports:Tests/TestResults/coverage.xml \
-reporttypes:"Html;JsonSummary" \
-targetdir:Tests/TestResults/CoverageReport

function getCoverage {
	value=$(grep -Po "(?<=\"$1coverage\": )[\.0-9]*" Tests/TestResults/CoverageReport/Summary.json | head -1)
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