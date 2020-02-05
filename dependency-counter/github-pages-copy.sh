rm -f -rf gh-pages/arrows &&
cp -r getSvgElementForStack/createArrows/tests/withUse/test-cases gh-pages/arrows &&
cp getSvgElementForStack/createArrows/tests/symbols/test-cases/down-10x10-*.svg gh-pages/arrows &&
rm -f -rf gh-pages/examples &&
mkdir gh-pages/examples &&
mkdir gh-pages/examples/level &&
cp getSvgForYaml/tests/test-cases/level/first-depends-upon-second/.svg gh-pages/examples/level/first-depends-upon-second.svg &&
cp getSvgForYaml/tests/test-cases/level/first-item-depends-upon-second-item/.svg gh-pages/examples/level/first-item-depends-upon-second-item.svg &&
cp getSvgForYaml/tests/test-cases/level/two-interdependent/.svg gh-pages/examples/level/two-interdependent.svg &&
cp getSvgForYaml/tests/test-cases/depends-upon-parent/.svg gh-pages/examples/item-depends-upon-parent.svg &&
cp getSvgForYaml/tests/test-cases/parent-depends-upon-item/.svg gh-pages/examples/parent-depends-upon-item.svg &&
mkdir gh-pages/examples/stack &&
cp getSvgForYaml/tests/test-cases/stack/lower-depends-upon-upper/.svg gh-pages/examples/stack/lower-depends-upon-upper.svg &&
cp getSvgForYaml/tests/test-cases/stack/two-interdependent/.svg gh-pages/examples/stack/two-interdependent.svg &&
cp getSvgForYaml/tests/test-cases/stack/upper-depends-upon-lower/.svg gh-pages/examples/stack/upper-depends-upon-lower.svg &&
cp getSvgForYaml/tests/test-cases/two/.svg gh-pages/examples/two.svg &&
cp getSvgForYaml/tests/withSubset/test-cases/upper-item-depends-upon-lower-item-with-parent.svg gh-pages/examples