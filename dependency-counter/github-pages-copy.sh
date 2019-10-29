rm -f -rf gh-pages/arrows &&
cp -r getSvgElementForStack/createArrows/test/withUse/testCases gh-pages/arrows &&
cp getSvgElementForStack/createArrows/test/symbols/testCases/down-10x10-*.svg gh-pages/arrows &&
rm -f -rf gh-pages/examples &&
mkdir gh-pages/examples &&
mkdir gh-pages/examples/level &&
cp getSvgForYaml/testCases/level/first-depends-upon-second/.svg gh-pages/examples/level/first-depends-upon-second.svg &&
cp getSvgForYaml/testCases/level/first-item-depends-upon-second-item/.svg gh-pages/examples/level/first-item-depends-upon-second-item.svg &&
cp getSvgForYaml/testCases/level/two-interdependent/.svg gh-pages/examples/level/two-interdependent.svg &&
cp getSvgForYaml/testCases/depends-upon-parent/.svg gh-pages/examples/item-depends-upon-parent.svg &&
cp getSvgForYaml/testCases/parent-depends-upon-item/.svg gh-pages/examples/parent-depends-upon-item.svg &&
mkdir gh-pages/examples/stack &&
cp getSvgForYaml/testCases/stack/lower-depends-upon-upper/.svg gh-pages/examples/stack/lower-depends-upon-upper.svg &&
cp getSvgForYaml/testCases/stack/two-interdependent/.svg gh-pages/examples/stack/two-interdependent.svg &&
cp getSvgForYaml/testCases/stack/upper-depends-upon-lower/.svg gh-pages/examples/stack/upper-depends-upon-lower.svg &&
cp getSvgForYaml/testCases/two/.svg gh-pages/examples/two.svg &&
cp getSvgForYaml/withSubset.testCases/upper-item-depends-upon-lower-item-with-parent.svg gh-pages/examples